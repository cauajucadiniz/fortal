import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-fortal-auto.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <img
        src={logoImage}
        alt="Fortal Auto - Since 2022"
        className={cn(sizeClasses[size], "object-contain")}
      />
    </div>
  );
};

export default Logo;
