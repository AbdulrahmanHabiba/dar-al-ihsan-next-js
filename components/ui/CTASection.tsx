import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    className?: string;
    showIcon?: boolean;
}

export const CTASection = ({
    title,
    description,
    buttonText,
    buttonLink,
    className,
    showIcon = true,
}: CTASectionProps) => {
    return (
        <section className={cn("py-20 bg-gradient-primary text-primary-foreground", className)}>
            <div className="container text-center">
                <div className="max-w-3xl mx-auto animate-slideUp">
                    {showIcon && <Heart className="h-16 w-16 mx-auto mb-6 animate-float" />}
                    <h2 className="text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-xl mb-8 opacity-90">
                        {description}
                    </p>
                    <Button size="lg" variant="secondary" className="text-lg" asChild>
                        <NavLink to={buttonLink}>{buttonText}</NavLink>
                    </Button>
                </div>
            </div>
        </section>
    );
};
