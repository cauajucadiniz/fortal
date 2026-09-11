import { Shield, Users, MapPin, Award, CheckCircle, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionTitle from "@/components/SectionTitle";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const Sobre = () => {
  const values = [
    {
      icon: Shield,
      title: "Transparência",
      description: "Informações claras e honestas sobre cada veículo, sem surpresas.",
    },
    {
      icon: CheckCircle,
      title: "Procedência",
      description: "Veículos com histórico verificado e documentação em dia.",
    },
    {
      icon: Users,
      title: "Atendimento Humano",
      description: "Tratamos cada cliente de forma única e personalizada.",
    },
    {
      icon: Heart,
      title: "Paixão por Carros",
      description: "Amamos o que fazemos e isso reflete em nosso trabalho.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sobre a Fortal Auto | Loja de Seminovos em Fortaleza"
        description="Conheça a história, valores e equipe da Fortal Auto. Desde 2022 oferecendo veículos seminovos com transparência e atendimento humanizado em Fortaleza."
        path="/sobre"
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container text-center">
          <div className="section-divider mb-4 mx-auto" />
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Sobre a Fortal Auto
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Conheça nossa história e nossos valores
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <Logo size="lg" className="relative z-10 scale-150" />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Seu sonho automotivo começa aqui
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Desde 2022, a <span className="text-primary font-semibold">Fortal Auto</span> atua no mercado de veículos seminovos em Fortaleza com um compromisso inabalável: oferecer qualidade, transparência e atendimento humanizado.
                </p>
                <p>
                  Acreditamos que comprar um carro deve ser uma experiência positiva e sem stress. Por isso, todos os nossos veículos passam por uma rigorosa inspeção técnica e mecânica antes de serem oferecidos aos nossos clientes.
                </p>
                <p>
                  Nossa equipe é formada por profissionais apaixonados pelo mercado automotivo, prontos para ajudar você a encontrar o veículo ideal para suas necessidades e orçamento.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/30">
                  <p className="font-heading font-bold text-2xl text-primary">285+</p>
                  <p className="text-muted-foreground text-sm">Veículos vendidos</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/30">
                  <p className="font-heading font-bold text-2xl text-primary">5.2K</p>
                  <p className="text-muted-foreground text-sm">Seguidores</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/30">
                  <p className="font-heading font-bold text-2xl text-primary">100%</p>
                  <p className="text-muted-foreground text-sm">Satisfação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <SectionTitle
            title="Nossos Valores"
            subtitle="Os princípios que guiam nosso trabalho"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
              Localização
            </h2>
            <p className="text-muted-foreground text-lg mb-2">
              Av. José Bastos, 2630 B
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Fortaleza - CE
            </p>
            
            <a
              href="https://maps.app.goo.gl/XBA8jij4oeBYZDN79"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Ver no Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <SectionTitle
            title="Nossa Equipe"
            subtitle="Conheça os profissionais prontos para atendê-lo"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                <img src="/mateus-perdigao.jpg" alt="Mateus Perdigão" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.removeAttribute('style'); }} />
                <Users className="w-10 h-10 text-primary" style={{ display: 'none' }} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Mateus Perdigão
              </h3>
              <p className="text-muted-foreground mb-4">Consultor de Vendas</p>
              <a
                href="https://wa.me/5585998308911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp hover:bg-whatsapp-hover text-white font-medium transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                <img src="/igor-freitas.jpg" alt="Igor Freitas" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.removeAttribute('style'); }} />
                <Users className="w-10 h-10 text-primary" style={{ display: 'none' }} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Igor Freitas
              </h3>
              <p className="text-muted-foreground mb-4">Consultor de Vendas</p>
              <a
                href="https://wa.me/558599885601"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp hover:bg-whatsapp-hover text-white font-medium transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
