import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface FeaturedPersonCardProps {
    name: string;
    info: string;
    imageUrl?: string;
}

export const FeaturedPersonCard = ({ name, info, imageUrl }: FeaturedPersonCardProps) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
                    <AvatarFallback className="bg-primary/10">
                        <User className="w-12 h-12 text-primary" />
                    </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <p className="text-muted-foreground">{info}</p>
            </CardContent>
        </Card>
    );
};
