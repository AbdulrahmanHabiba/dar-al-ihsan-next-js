"use client";

// import { MessageCircle, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type FloatingActionType = "whatsapp" | "messenger" | "custom";

interface FloatingActionButtonProps {
  type?: FloatingActionType;
  phoneNumber?: string;
  messengerUsername?: string;
  customUrl?: string;
  customIcon?: React.ReactNode;
  message?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

export const FloatingActionButton = ({
  type = "whatsapp",
  phoneNumber = "966500000000",
  messengerUsername,
  customUrl,
  customIcon,
  message = "مرحباً، أود الاستفسار عن",
  position = "bottom-right",
  className,
}: FloatingActionButtonProps) => {
  const getUrl = () => {
    switch (type) {
      case "whatsapp":
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      case "messenger":
        return messengerUsername 
          ? `https://m.me/${messengerUsername}`
          : "#";
      case "custom":
        return customUrl || "#";
      default:
        return "#";
    }
  };

  // const getIcon = () => {
  //   if (customIcon) return customIcon;
  //   if (type === "messenger") return <Send className="h-6 w-6" />;
  //   return <MessageCircle className="h-6 w-6" />;
  // };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-20 right-2";
      case "bottom-left":
        return "bottom-20 left-2";
      case "top-right":
        return "top-20 right-2";
      case "top-left":
        return "top-20 left-2";
      default:
        return "bottom-20 right-2";
    }
  };

  // const getColorClasses = () => {
  //   if (type === "whatsapp") return "bg-green-500 hover:bg-green-600";
  //   if (type === "messenger") return "bg-blue-500 hover:bg-blue-600";
  //   return "bg-primary hover:bg-primary/90";
  // };
  const getIconImage = () => {
    if (type === "messenger") return <Image src="/messenger.svg" alt="messenger" width={48} height={48} />;
    return <Image src="/whatsapp.svg" alt="whatsapp" width={48} height={48} />;
  };

  return (
    <a
      href={getUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-50 group",
        getPositionClasses(),
        className
      )}
    >
      {getIconImage()}
      {/* <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110",
          getColorClasses()
        )}
      >
        {getIcon()}
      </Button> */}
    </a>
  );
};