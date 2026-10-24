import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Calendar, Gauge, Settings, Fuel, Users, Palette, Check, ChevronLeft, ChevronRight,
  MessageCircle, Share2, X, ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import VehicleCardDetailed from "@/components/VehicleCardDetailed";
import { Button } from "@/components/ui/button";
import { trackLead } from "@/lib/trackLead";
import { SITE_URL } from "@/lib/site";
import { vehicles, soldVehicles, getVehicleGallery } from "@/data/vehicles";

const priceNumber = (p: string) => Number(p.replace(/[^\d,]/g, "").replace(",", ".")) || undefined;

const VeiculoDetalhe = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id) || soldVehicles.find((v) => v.id === id);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => setIndex(0), [id]);

  const photos = vehicle ? getVehicleGallery(vehicle) : [];
  const count = photos.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!vehicle) return <Navigate to="/veiculos" replace />;

  const sold = vehicle.status === "sold";
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  const path = `/veiculos/${vehicle.id}`;
  const msg = `Olá! Estou vindo pelo site da Fortal Auto e tenho interesse no ${title} (${SITE_URL}${path}). Poderia me passar mais informações?`;
  const whatsappLink = `https://wa.me/${vehicle.whatsapp}?text=${encodeURIComponent(msg)}`;
  const related = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  const specs = [
    { icon: Calendar, label: "Ano", value: vehicle.year },
    { icon: Gauge, label: "Quilometragem", value: vehicle.km ? `${vehicle.km} km` : undefined },
    { icon: Settings, label: "Câmbio", value: vehicle.transmission },
    { icon: Fuel, label: "Motor", value: vehicle.engine },
    { icon: Users, label: "Lugares", value: vehicle.seats },
    { icon: Palette, label: "Cor", value: vehicle.color },
  ].filter((s) => s.value);

  const share = async () => {
    const url = `${SITE_URL}${path}`;
    if (navigator.share) await navigator.share({ title, url }).catch(() => {});
    else await navigator.clipboard?.writeText(url);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: title,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleModelDate: vehicle.year,
    ...(vehicle.km ? { mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.km.replace(/\D/g, ""), unitCode: "KMT" } } : {}),
    vehicleTransmission: vehicle.transmission,
    image: photos.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`)),
    url: `${SITE_URL}${path}`,
    offers: {
      "@type": "Offer",
      price: priceNumber(vehicle.price),
      priceCurrency: "BRL",
      availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: "Fortal Auto", url: SITE_URL },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${title} - ${vehicle.price} | Fortal Auto Fortaleza`}
        description={`${title}${vehicle.km ? `, ${vehicle.km} km` : ""}, ${vehicle.transmission}. ${vehicle.highlights.slice(0, 3).join(", ")}. Veja ${count} fotos e fale pelo WhatsApp com a Fortal Auto em Fortaleza.`}
        path={path}
        image={photos[0]?.startsWith("http") ? photos[0] : `${SITE_URL}${photos[0]}`}
        jsonLd={jsonLd}
      />
      <Header />
      <WhatsAppButton />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/veiculos" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar ao estoque
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{vehicle.model}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
            {/* Galeria */}
            <div className="min-w-0">
              <div className="relative rounded-2xl overflow-hidden bg-secondary/30 border border-border/50 aspect-[4/5] sm:aspect-[4/3]">
                <img
                  src={photos[index]}
                  alt={`${title} - foto ${index + 1} de ${count}`}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setZoom(true)}
                />
                {sold && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-sm font-semibold">Vendido</span>
                )}
                {count > 1 && (
                  <>
                    <button aria-label="Foto anterior" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button aria-label="Próxima foto" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-background/80 text-xs font-medium">{index + 1} / {count}</span>
                  </>
                )}
              </div>
              {count > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {photos.map((p, i) => (
                    <button
                      key={p + i}
                      onClick={() => setIndex(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                    >
                      <img src={p} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="min-w-0">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-semibold mb-3">{vehicle.brand}</span>
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">{vehicle.model} {vehicle.year}</h1>
              <p className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">{vehicle.price}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/30">
                    <s.icon className="w-5 h-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-semibold text-foreground leading-tight">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {sold ? (
                <div className="p-4 rounded-xl border border-border/50 bg-card mb-6">
                  <p className="font-semibold mb-1">Este veículo já foi vendido.</p>
                  <p className="text-sm text-muted-foreground mb-3">Fale com a gente que encontramos um parecido para você.</p>
                  <Button asChild variant="outline"><Link to="/veiculos">Ver estoque atual</Link></Button>
                </div>
              ) : (
                <div className="flex gap-3 mb-6">
                  <Button asChild className="flex-1 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2 h-12">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackLead}>
                      <MessageCircle className="w-5 h-5" /> Tenho interesse
                    </a>
                  </Button>
                  <Button variant="outline" className="h-12 px-4" onClick={share} aria-label="Compartilhar">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <ShieldCheck className="w-4 h-4 text-primary" /> Revisado, com procedência. Aceitamos troca e financiamento.
              </div>

              <h2 className="font-heading font-semibold text-lg mb-3">Itens e destaques</h2>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                {vehicle.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading font-bold text-2xl mb-6">Veja também</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((v) => (
                  <VehicleCardDetailed key={v.id} {...v} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {zoom && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center" onClick={() => setZoom(false)}>
          <button aria-label="Fechar" className="absolute top-4 right-4 text-white p-2"><X className="w-7 h-7" /></button>
          {count > 1 && (
            <button aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 md:left-6 text-white p-3"><ChevronLeft className="w-8 h-8" /></button>
          )}
          <img src={photos[index]} alt={title} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
          {count > 1 && (
            <button aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 md:right-6 text-white p-3"><ChevronRight className="w-8 h-8" /></button>
          )}
          <span className="absolute bottom-4 text-white/80 text-sm">{index + 1} / {count}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VeiculoDetalhe;
