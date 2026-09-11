import { MessageCircle, Calendar, Gauge, Fuel, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackLead } from "@/lib/trackLead";

interface VehicleCardDetailedProps {
  image: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  km?: string;
  transmission: string;
  engine?: string;
  highlights: string[];
  whatsapp: string;
}

const VehicleCardDetailed = ({
  image,
  brand,
  model,
  year,
  price,
  km,
  transmission,
  engine,
  highlights,
  whatsapp,
}: VehicleCardDetailedProps) => {
  const whatsappMessage = `Olá! Estou vindo pelo site da Fortal Auto e tenho interesse no ${brand} ${model} ${year}. Poderia me passar mais informações?`;
  const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="vehicle-card group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={`${brand} ${model} ${year}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Brand Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
          <span className="text-xs font-semibold text-foreground">{brand}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-2 line-clamp-1">
          {model}
        </h3>
        
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
            <Calendar className="w-3 h-3" />
            <span>{year}</span>
          </div>
          {km && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
              <Gauge className="w-3 h-3" />
              <span>{km} km</span>
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
            <Settings className="w-3 h-3" />
            <span>{transmission}</span>
          </div>
          {engine && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
              <Fuel className="w-3 h-3" />
              <span>{engine}</span>
            </div>
          )}
        </div>

        <p className="font-heading font-bold text-2xl text-primary mb-4">
          {price}
        </p>

        <div className="space-y-1.5 mb-5">
          {highlights.slice(0, 4).map((highlight, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{highlight}</span>
            </div>
          ))}
          {highlights.length > 4 && (
            <span className="text-xs text-muted-foreground/70">
              +{highlights.length - 4} mais
            </span>
          )}
        </div>

        <Button
          asChild
          className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2 h-12"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackLead}>
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default VehicleCardDetailed;
