"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSectionCardProps {
  title: string;
  description?: string;
  /** نص زر الإجراء الرئيسي (مثلاً: إضافة خبر جديد) */
  actionLabel?: string;
  /** دالة زر الإجراء (لو مش موجودة، الزر مش هيظهر) */
  onActionClick?: () => void;
  /** أيقونة الزر (اختياري، الافتراضي Plus) */
  actionIcon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function DashboardSectionCard({
  title,
  description,
  actionLabel,
  onActionClick,
  actionIcon: ActionIcon = Plus,
  children,
  className,
}: DashboardSectionCardProps) {
  const showAction = Boolean(onActionClick && actionLabel);

  return (
    <Card className={cn(className)}>
      {/* هيدر ثابت تحت هيدر الداشبورد */}
      <CardHeader
        className={cn(
          "sticky top-0 z-30 bg-card/95 backdrop-blur border-b",
          "flex items-center justify-between flex-row gap-4"
        )}
      >
        <div>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
              {description}
            </p>
          )}
        </div>

        {showAction && (
          <Button className="gap-2" onClick={onActionClick}>
            <ActionIcon className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}


