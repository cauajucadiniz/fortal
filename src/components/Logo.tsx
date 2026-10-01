import { cn } from "@/lib/utils";
import logoImage from "@/assets/Logo FortalAuto.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-10 md:h-12 w-auto max-w-[130px]",
    md: "h-14 md:h-16 w-auto max-w-[190px]",
    lg: "h-24 md:h-32 w-auto max-w-[320px]",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <img
        src={logoImage}
        alt="Fortal Auto - Since 2022"
        className={cn(sizeClasses[size], "object-contain drop-shadow-sm")}
      />
    </div>
  );
};

export default Logo;
