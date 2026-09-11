import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const TrustBadge = ({ icon: Icon, title, description, className }: TrustBadgeProps) => {
  return (
    <div className={cn("trust-badge", className)}>
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-lg mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default TrustBadge;
