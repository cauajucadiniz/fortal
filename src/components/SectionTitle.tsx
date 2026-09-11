import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ title, subtitle, centered = true, className }: SectionTitleProps) => {
  return (
    <div className={cn("mb-10 md:mb-14", centered && "text-center", className)}>
      <div className={cn("section-divider mb-4", centered && "mx-auto")} />
      <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
