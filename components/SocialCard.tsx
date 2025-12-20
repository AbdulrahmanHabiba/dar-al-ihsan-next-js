import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { Facebook, Users, MessageCircle } from "lucide-react";

interface SocialCardProps {
  name: string;
  url: string;
  imgSrc?: string;
  subtitle?: string;
  iconType?: "facebook" | "whatsapp";
}

export function SocialCard({ name, url, imgSrc, subtitle, iconType }: SocialCardProps) {
  const renderIcon = () => {
    if (iconType === "facebook") {
      return <Facebook className="h-6 w-6 text-blue-500" />;
    }
    if (iconType === "whatsapp") {
      return <MessageCircle className="h-6 w-6 text-green-600" />;
    }
    // fallback
    return <Users className="h-6 w-6 text-gray-400" />;
  };

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">
      <div
        className="
          flex 
          items-center 
          gap-3 
          p-2 
          pr-3
          rounded-2xl
          bg-card/50
          backdrop-blur-sm
          border
          border-border
          hover:border-primary/30
          hover:shadow-elegant 
          transition-all 
          duration-300 
          cursor-pointer 
          group
        "
      >
        <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
          {imgSrc ? (
            <AvatarImage src={imgSrc} alt={name} className="object-cover" />
          ) : (
            <span className="flex items-center justify-center w-full h-full bg-primary/5">
              {renderIcon()}
            </span>
          )}
          <AvatarFallback className="bg-primary/5 text-primary text-xs tracking-tighter">{name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-right leading-none">
          <span className="font-bold text-xs text-foreground/90 group-hover:text-primary transition-colors whitespace-nowrap">
            {name}
          </span>
          {subtitle && (
            <span className="text-[9px] text-muted-foreground line-clamp-1 mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
