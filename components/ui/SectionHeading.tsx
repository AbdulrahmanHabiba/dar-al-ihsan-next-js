import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    centered?: boolean;
}

export const SectionHeading = ({
    title,
    description,
    className,
    titleClassName,
    descriptionClassName,
    centered = true,
}: SectionHeadingProps) => {
    return (
        <div className={cn(
            "mb-12 animate-slideUp",
            centered && "text-center",
            className
        )}>
            <h2 className={cn(
                "text-4xl font-bold mb-4",
                titleClassName
            )}>
                {title}
            </h2>
            {description && (
                <p className={cn(
                    "text-muted-foreground text-lg max-w-2xl",
                    centered && "mx-auto",
                    descriptionClassName
                )}>
                    {description}
                </p>
            )}
        </div>
    );
};
