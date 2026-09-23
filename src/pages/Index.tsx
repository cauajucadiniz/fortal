import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, Car, MessageCircle, Repeat, Search, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCardDetailed from "@/components/VehicleCardDetailed";
import SEO from "@/components/SEO";
import TrustBadge from "@/components/TrustBadge";
import SectionTitle from "@/components/SectionTitle";
import heroBanner from "@/assets/frente-loja.png";
import { useVehicleStock } from "@/hooks/useVehicleStock";
import { vehicles as staticVehicles } from "@/data/vehicles";
import { trackLead } from "@/lib/trackLead";

const Index = () => {
  const whatsappLink = "https://wa.me/5585998308911?text=Olá! Estou vindo pelo site da Fortal Auto e gostaria de mais informações.";

  const { data: vehicles = staticVehicles, isLoading: isLoadingVehicles } = useVehicleStock();
  const featuredVehicles = vehicles.slice(0, 3);

  const trustItems = [
    {
      icon: Search,
      title: "Veículos Revisados",
      description: "Todos os nossos seminovos passam por uma rigorosa inspeção mecânica e técnica.",
    },
    {
      icon: Shield,
      title: "Procedência Garantida",
      description: "Histórico completo do veículo, sem pendências e com documentação regularizada.",
    },
    {
      icon: Award,
      title: "Garantia de Qualidade",
      description: "Oferecemos garantia em todos os veículos para sua total tranquilidade.",
    },
  ];

  const services = [
    {
      icon: Car,
      title: "Compra",
      description: "Encontre o veículo ideal para você",
    },
    {
      icon: MessageCircle,
      title: "Venda",
      description: "Vendemos seu veículo com segurança",
    },
    {
      icon: Repeat,
      title: "Troca",
      description: "Troque seu carro por outro modelo",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Fortal Auto - Veículos Seminovos em Fortaleza"
        description="Compra, venda e troca de veículos seminovos em Fortaleza com procedência, transparência e garantia. Atendimento humanizado pela Fortal Auto."
        path="/"
      />
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Showroom Fortal Auto"
            className="w-full h-full object-cover object-center"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Fortaleza - CE</span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 fade-in" style={{ animationDelay: "0.1s" }}>
              Fortal Auto - Veículos Seminovos{" "}
              <span className="text-primary">em Fortaleza</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed fade-in" style={{ animationDelay: "0.2s" }}>
              Compra, venda e troca de veículos seminovos com procedência, transparência e garantia. Atendimento humanizado em Fortaleza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{ animationDelay: "0.3s" }}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 red-glow red-glow-hover h-14 px-8 text-base"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackLead}>
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border/50 bg-background/50 backdrop-blur hover:bg-secondary font-semibold gap-2 h-14 px-8 text-base"
              >
                <Link to="/veiculos">
                  Ver Veículos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-foreground text-lg">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionTitle
            title="Veículos em Destaque"
            subtitle="Confira alguns dos nossos seminovos selecionados"
          />

          {isLoadingVehicles ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Carregando veículos">
              {[0, 1, 2].map((item) => (
                <div key={item} className="aspect-[3/4] animate-pulse rounded-lg bg-secondary/50" />
              ))}
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCardDetailed key={vehicle.id} {...vehicle} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Consulte nosso estoque atualizado pelo WhatsApp.</p>
          )}

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold gap-2"
            >
              <Link to="/veiculos">
                Ver Todos os Veículos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <SectionTitle
            title="Por Que Escolher a Fortal Auto?"
            subtitle="Confiança e transparência em cada negociação"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {trustItems.map((item) => (
              <TrustBadge key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20 p-8 md:p-12 lg:p-16">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                Pronto para encontrar seu próximo carro?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Entre em contato pelo WhatsApp e fale diretamente com nossa equipe. Atendimento rápido e sem burocracia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2 h-14 px-8 text-base"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackLead}>
                    <MessageCircle className="w-5 h-5" />
                    Falar com Mateus
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2 h-14 px-8 text-base"
                >
                  <a href={`https://wa.me/5585999885601?text=${encodeURIComponent("Olá Igor! Estou vindo pelo site da Fortal Auto e gostaria de mais informações.")}`} target="_blank" rel="noopener noreferrer" onClick={trackLead}>
                    <MessageCircle className="w-5 h-5" />
                    Falar com Igor
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Resposta rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Sem burocracia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Atendimento humano</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
