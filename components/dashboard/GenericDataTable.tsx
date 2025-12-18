"use client";

import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LucideIcon } from "lucide-react";

export interface ColumnDef<T> {
    header: React.ReactNode;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
    className?: string;
}

export interface RowAction<T> {
    icon: LucideIcon;
    onClick: (row: T) => void;
    variant?: "default" | "destructive";
}

interface GenericDataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    actions?: RowAction<T>[];
    searchKeys?: (keyof T)[];
    searchPlaceholder?: string;
    isLoading?: boolean;
    emptyMessage?: string;
    getRowKey: (row: T) => string | number;
}

// تطبيع الحروف العربية لأجل البحث فقط (دون تغيير البيانات الأصلية)
function normalizeArabic(text: string): string {
    return text
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ئ/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ة/g, "ه")
        .replace(/ء/g, "");
}

export function GenericDataTable<T extends Record<string, any>>({
    data,
    columns,
    actions,
    searchKeys = [],
    searchPlaceholder = "البحث...",
    isLoading = false,
    emptyMessage = "لا توجد بيانات",
    getRowKey,
}: GenericDataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        const raw = searchQuery.trim().toLowerCase();
        const q = normalizeArabic(raw);
        if (!q || searchKeys.length === 0) return data;

        return data.filter((item) =>
            searchKeys.some((key) => {
                const value = item[key];
                if (value == null) return false;
                const normalizedValue = normalizeArabic(String(value).toLowerCase());
                return normalizedValue.includes(q);
            })
        );
    }, [data, searchQuery, searchKeys]);

    return (
        <div className="space-y-4">
            {searchKeys.length > 0 && (
                <div className="flex items-center gap-2 sticky top-[80px] md:top-[100px] z-20 bg-background/95 backdrop-blur pt-2 pb-3 -mx-6 px-6">
                    <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            className="pr-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-card">
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index} className="text-right bg-card">
                                        {column.header}
                                    </TableHead>
                                ))}
                                {actions && actions.length > 0 && (
                                    <TableHead className="text-right bg-card">الإجراءات</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length + (actions ? 1 : 0)}
                                        className="text-center text-muted-foreground"
                                    >
                                        جاري التحميل...
                                    </TableCell>
                                </TableRow>
                            ) : filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length + (actions ? 1 : 0)}
                                        className="text-center text-muted-foreground"
                                    >
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((row) => (
                                    <TableRow key={getRowKey(row)}>
                                        {columns.map((column, colIndex) => (
                                            <TableCell key={colIndex} className={column.className}>
                                                {column.cell
                                                    ? column.cell(row)
                                                    : column.accessorKey
                                                        ? String(row[column.accessorKey] ?? "-")
                                                        : "-"}
                                            </TableCell>
                                        ))}
                                        {/* Inline Row Actions */}
                                        {actions && actions.length > 0 && (
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-right" dir="rtl">
                                                    {actions.map((action, actionIndex) => (
                                                        <Button
                                                            key={actionIndex}
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => action.onClick(row)}
                                                            className={action.variant === "destructive" ? "text-destructive" : ""}
                                                        >
                                                            <action.icon className="h-4 w-4" />
                                                        </Button>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
