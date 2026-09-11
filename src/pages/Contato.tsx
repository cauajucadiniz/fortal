import { MessageCircle, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionTitle from "@/components/SectionTitle";
import SEO from "@/components/SEO";
import { trackLead } from "@/lib/trackLead";

const Contato = () => {
  const contacts = [
    {
      name: "Mateus Perdigão",
      role: "Consultor de Vendas",
      whatsapp: "https://wa.me/5585998308911?text=" + encodeURIComponent("Olá Mateus! Estou vindo pelo site da Fortal Auto e gostaria de mais informações."),
      phone: "(85) 99830-8911",
    },
    {
      name: "Igor Freitas",
      role: "Consultor de Vendas",
      whatsapp: "https://wa.me/5585999885601?text=" + encodeURIComponent("Olá Igor! Estou vindo pelo site da Fortal Auto e gostaria de mais informações."),
      phone: "(85) 99988-5601",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contato Fortal Auto | WhatsApp e Endereço em Fortaleza"
        description="Fale com Mateus ou Igor pelo WhatsApp, veja o endereço, horários e redes sociais da Fortal Auto em Fortaleza - CE."
        path="/contato"
      />
      <Header />
      <WhatsAppButton />

      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container text-center">
          <div className="section-divider mb-4 mx-auto" />
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Entre em Contato com a Fortal Auto
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Estamos prontos para ajudá-lo a encontrar o veículo ideal
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className="p-8 rounded-2xl bg-card border border-border/50"
              >
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                  {contact.name}
                </h3>
                <p className="text-muted-foreground mb-6">{contact.role}</p>

                <div className="space-y-4">
                  <Button
                    asChild
                    className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2 h-12"
                  >
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackLead}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Falar no WhatsApp
                    </a>
                  </Button>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border/30 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-foreground mb-2">Localização</h4>
              <p className="text-muted-foreground text-sm">
                Av. José Bastos, 2630 B<br />
                Fortaleza - CE
              </p>
              <a
                href="https://maps.app.goo.gl/XBA8jij4oeBYZDN79"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary text-sm hover:underline"
              >
                Ver no mapa →
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/50 border border-border/30 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-foreground mb-2">Horário</h4>
              <p className="text-muted-foreground text-sm">
                Segunda a Sexta: 8h - 17h<br />
                Sábado: 8h - 12h
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/50 border border-border/30 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-foreground mb-2">Redes Sociais</h4>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://instagram.com/fortal_auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackLead}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1DG68yqVyP/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackLead}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/50">
            <iframe
              src="https://maps.google.com/maps?q=Fortal%20Auto,%20Fortaleza&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Fortal Auto"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
