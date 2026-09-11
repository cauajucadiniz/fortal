import { Link } from "react-router-dom";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import Logo from "./Logo";
import { trackLead } from "@/lib/trackLead";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const whatsappMateus = "https://wa.me/5585998308911?text=" + encodeURIComponent("Olá Mateus! Estou vindo pelo site da Fortal Auto e gostaria de mais informações.");
  const whatsappIgor = "https://wa.me/5585999885601?text=" + encodeURIComponent("Olá Igor! Estou vindo pelo site da Fortal Auto e gostaria de mais informações.");
  const instagram = "https://instagram.com/fortal_auto";
  const facebook = "https://www.facebook.com/share/1DG68yqVyP/?mibextid=wwXIfr";
  const mapsLink = "https://maps.app.goo.gl/XBA8jij4oeBYZDN79";

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <Logo size="md" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seu sonho automotivo começa aqui. Compra, venda e troca de veículos seminovos com procedência e garantia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/veiculos", label: "Veículos" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappMateus}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackLead}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Mateus Perdigão
                </a>
              </li>
              <li>
                <a
                  href={whatsappIgor}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackLead}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Igor Freitas
                </a>
              </li>
              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Av. José Bastos, 2630 B<br />
                    Fortaleza - CE
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLead}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLead}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} Fortal Auto. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            CNPJ: 53.462.143/0001-81
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
