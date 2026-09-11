import { MessageCircle } from "lucide-react";
import { trackLead } from "@/lib/trackLead";

const WhatsAppButton = () => {
  const whatsappLink = "https://wa.me/5585998308911?text=Olá! Estou vindo pelo site da Fortal Auto e gostaria de mais informações.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackLead}
      className="whatsapp-float w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp hover:bg-whatsapp-hover flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" fill="white" />
    </a>
  );
};

export default WhatsAppButton;
