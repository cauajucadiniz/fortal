import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  image: string;
  model: string;
  year: string;
  price: string;
  km?: string;
  fuel?: string;
}

const VehicleCard = ({ image, model, year, price, km, fuel }: VehicleCardProps) => {
  const whatsappLink = `https://wa.me/5585998308911?text=Olá! Tenho interesse no ${model} ${year}. Poderia me passar mais informações?`;

  return (
    <div className="vehicle-card group bg-card rounded-2xl overflow-hidden border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={`${model} ${year}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-heading font-bold text-foreground text-lg mb-1 line-clamp-1">
          {model}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span>{year}</span>
          {km && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{km} km</span>
            </>
          )}
          {fuel && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{fuel}</span>
            </>
          )}
        </div>

        <p className="font-heading font-bold text-xl text-primary mb-4">
          {price}
        </p>

        <Button
          asChild
          className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold gap-2"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Tenho Interesse
          </a>
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
