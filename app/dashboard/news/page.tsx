"use client";

import { useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useNews, useCreateNews ,useUpdateNews, useDeleteNews } from "@/hooks/useNews";
import type { News } from "@/types/news";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";

const newsFields: FormFieldConfig[] = [
    { name: "title", label: "العنوان", type: "text", placeholder: "عنوان الخبر", required: true },
    { name: "description", label: "المحتوى", type: "richtext", placeholder: "اكتب تفاصيل الخبر هنا..." },
    { name: "images", label: "الصور", type: "images", placeholder: "رابط الصورة" },
    { name: "videoUrl", label: "رابط الفيديو (إن وجد)", type: "url", placeholder: "https://youtube.com/..." },
    { name: "publisher", label: "الناشر (اختياري)", type: "text", placeholder: "اسم الناشر" },
    { name: "link", label: "رابط خارجي (إن وجد)", type: "url", placeholder: "https://example.com/..." },
    { name: "linkTitle", label: "نص رابط إضافي", type: "text", placeholder: "مثال: انقر هنا 👆" },
    { name: "published", label: "منشور", type: "switch", defaultValue: true },
    { name: "createdAt", label: "تاريخ النشر", type: "date", placeholder: "تاريخ النشر" },
];

export default function NewsPage() {
    const { data: news = [], isLoading } = useNews();
    const createNewsMutation = useCreateNews();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<News | null>(null);

    const updateNewsMutation = useUpdateNews(editingItem?.id ?? 0);

    const handleAdd = () => {
        setEditingItem(null);
        setDialogOpen(true);
    };

    const handleEdit = (item: News) => {
        setEditingItem(item);
        setDialogOpen(true);
    };

    const handleDelete = async (item: News) => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا الخبر؟");
        if (!confirmed) return;

        try {
            const deleteMutation = useDeleteNews(item.id);
            await deleteMutation.mutateAsync();
        } catch (error) {
            console.error("Failed to delete news", error);
        }
    };

    const handleSubmit = async (formData: Record<string, any>) => {
        const payload: Partial<News> = {
            title: formData.title,
            description: formData.description ?? null,
            images: formData.images ?? [],
            videoUrl: formData.videoUrl || null,
            publisher: formData.publisher || null,
            link: formData.link || null,
            linkTitle: formData.linkTitle || null,
            published: formData.published ?? false,
            createdAt: formData.createdAt ? new Date(formData.createdAt).toISOString() : undefined,
        };

        try {
            if (editingItem) {
                await updateNewsMutation.mutateAsync(payload);
            } else {
                await createNewsMutation.mutateAsync(payload);
            }
            setDialogOpen(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Failed to submit news", error);
        }
    };

    const columns: ColumnDef<News>[] = [
        { header: "العنوان", accessorKey: "title", className: "font-medium" },
        { header: "الناشر", accessorKey: "publisher" },
        {
            header: "الحالة",
            cell: (row) => (
                <Badge variant={row.published ? "default" : "secondary"}>
                    {row.published ? "منشور" : "مسودة"}
                </Badge>
            ),
        },
        {
            header: "تاريخ الإضافة",
            cell: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString("ar-EG") : "-"),
        },
    ];

    const actions: RowAction<News>[] = [
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <>
            <DashboardSectionCard
                title="إدارة الأخبار"
                description="إضافة وتعديل وحذف الأخبار"
                actionLabel="إضافة خبر جديد"
                onActionClick={handleAdd}
            >
                <GenericDataTable
                    data={news}
                    columns={columns}
                    actions={actions}
                    searchKeys={["title", "description", "publisher"]}
                    searchPlaceholder="البحث في الأخبار..."
                    isLoading={isLoading}
                    emptyMessage="لا توجد أخبار حالياً"
                    getRowKey={(row) => row.id}
                />
            </DashboardSectionCard>

            <DynamicFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? "تعديل الخبر" : "إضافة خبر جديد"}
                fields={newsFields}
                initialData={editingItem ?? undefined}
                onSubmit={handleSubmit}
                isLoading={createNewsMutation.isPending || updateNewsMutation.isPending}
                mode={editingItem ? "edit" : "add"}
            />
        </>
    );
}
