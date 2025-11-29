import { Card, CardContent } from "./ui/card";
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
      return <Facebook className="h-10 w-10 text-blue-500" />;
    }
    if (iconType === "whatsapp") {
      return <MessageCircle className="h-10 w-10 text-green-600" />;
    }
    // fallback
    return <Users className="h-10 w-10 text-gray-400" />;
  };
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
  <Card 
    className="
      text-center 
      w-full 
      max-w-[20rem] 
      max-h-28 
      flex 
      items-center 
      justify-center 
      rounded-3xl
      hover:shadow-md 
      transition-all 
      duration-300 
      cursor-pointer 
      px-4
      py-2
      min-w-[15rem]
      sm:w-auto
      
    "
  >
    <CardContent className="flex items-center justify-center gap-4 p-0">
      
      <Avatar className="h-12 w-12 bg-muted rounded-full">
        {imgSrc ? (
          <AvatarImage src={imgSrc} alt={name} />
        ) : (
          <span className="flex items-center justify-center w-full h-full">
            {renderIcon()}
          </span>
        )}
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-right leading-tight">
        <span className="font-semibold text-sm line-clamp-1">
          {name}
        </span>

        {subtitle && (
          <span className="text-xs text-muted-foreground line-clamp-1">
            {subtitle}
          </span>
        )}
      </div>

    </CardContent>
  </Card>
</Link>

  );
}

