import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    isLoading?: boolean;
}

export const ConfirmDialog = ({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    variant = "default",
    isLoading = false,
}: ConfirmDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-right">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-right">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row-reverse gap-2">
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isLoading}
                        className={cn(
                            variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        )}
                    >
                        {isLoading ? "جاري المعالجة..." : confirmText}
                    </AlertDialogAction>
                    <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
