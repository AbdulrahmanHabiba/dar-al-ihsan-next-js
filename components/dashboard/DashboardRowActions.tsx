import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButton {
  icon: LucideIcon;
  variant?: "default" | "destructive";
  onClick?: () => void;
}

interface DashboardRowActionsProps {
  actions: ActionButton[];
}

export function DashboardRowActions({ actions }: DashboardRowActionsProps) {
  return (
    <div className="flex items-center gap-2 text-right" dir="rtl">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={action.onClick}
          className={action.variant === "destructive" ? "text-destructive" : ""}
        >
          <action.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
