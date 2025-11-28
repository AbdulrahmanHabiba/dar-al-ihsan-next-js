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
      <Card className="text-center min-w-[9rem] max-w-[20rem] h-32 min-h-[8rem] max-h-[9rem] flex flex-col items-center justify-center hover:shadow-glow transition-all duration-300 cursor-pointer">
        <CardContent className="flex  items-center justify-center gap-2 p-4">
          <Avatar className="h-14 w-14 mb-2 bg-muted">
            {imgSrc ? (
              <AvatarImage src={imgSrc} alt={name} />
            ) : (
              <span className="flex w-full h-full">{renderIcon()}</span>
            )}
            <AvatarFallback>
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bold text-xs line-clamp-2 w-full">
              {name}
            </div>
            {subtitle &&
              <div className="text-xs text-muted-foreground line-clamp-1">
                {subtitle}
              </div>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

