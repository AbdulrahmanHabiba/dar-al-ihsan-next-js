import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedPersonCardProps {
    name: string;
    info: string;
    achievement?: string | null;
    imageUrl?: string;
}

export const FeaturedPersonCard = ({ name, info, achievement, imageUrl }: FeaturedPersonCardProps) => {
    return (
        <Card className="hover:shadow-elegant transition-all duration-300 group border-primary/10 overflow-hidden">
            <div className="h-2 bg-gradient-primary w-full" />
            <CardContent className="p-8 flex flex-col items-center text-center">
                <Avatar className="w-28 h-28 mb-6 border-4 border-primary/5 transition-transform group-hover:scale-105">
                    {imageUrl && <AvatarImage src={imageUrl} alt={name} className="object-cover" />}
                    <AvatarFallback className="bg-primary/5">
                        <User className="w-14 h-14 text-primary/30" />
                    </AvatarFallback>
                </Avatar>
                
                <Badge variant="secondary" className="mb-3">{info}</Badge>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{name}</h3>
                
                {achievement && (
                    <div className="mt-4 pt-4 border-t w-full flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <Trophy className="h-4 w-4" />
                            <span>الإنجاز</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{achievement}"</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
