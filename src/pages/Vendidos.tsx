import { Link } from "react-router-dom";
import { Calendar, Gauge, Settings, Fuel, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { soldVehicles } from "@/data/vehicles";

const Vendidos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Veículos Vendidos | Fortal Auto"
        description="Arquivo de veículos já vendidos pela Fortal Auto em Fortaleza. Veja modelos que passaram pelo nosso estoque."
        path="/vendidos"
      />
      <Header />
      <WhatsAppButton />

      <section className="pt-24 md:pt-32 pb-6 md:pb-10">
        <div className="container text-center">
          <div className="section-divider mb-4 mx-auto" />
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Veículos Vendidos
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Arquivo dos veículos que já saíram do nosso estoque. Estes modelos não estão mais disponíveis.
          </p>
          <Button asChild variant="outline" className="mt-6 gap-2">
            <Link to="/veiculos">
              <ArrowLeft className="h-4 w-4" /> Ver estoque disponível
            </Link>
          </Button>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container">
          {soldVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {soldVehicles.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl overflow-hidden border border-border/50 bg-card"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
                    <img
                      src={v.image}
                      alt={`${v.brand} ${v.model} ${v.year} - vendido`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center grayscale opacity-70"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide">
                      VENDIDO
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h2 className="font-heading font-bold text-foreground text-lg mb-2 line-clamp-1">
                      {v.brand} {v.model}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
                        <Calendar className="w-3 h-3" />
                        <span>{v.year}</span>
                      </div>
                      {v.km && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
                          <Gauge className="w-3 h-3" />
                          <span>{v.km} km</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
                        <Settings className="w-3 h-3" />
                        <span>{v.transmission}</span>
                      </div>
                      {v.engine && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
                          <Fuel className="w-3 h-3" />
                          <span>{v.engine}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum veículo arquivado no momento.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vendidos;
