`use client`;

import { useMemo, useState } from "react";
import { DashboardSection } from "./layout/DashboardSection";
import { DashboardSearchBar } from "./layout/DashboardSearchBar";
import { DashboardRowActions } from "./layout/DashboardRowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { DynamicFormDialog, FormFieldConfig } from "./layout/DynamicFormDialog";
import { useNews, useCreateNews, useDeleteNews } from "@/hooks/useNews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { News } from "@/types/news";

const newsFields: FormFieldConfig[] = [
  {
    name: "title",
    label: "العنوان",
    type: "text",
    placeholder: "عنوان الخبر",
    required: true,
  },
  {
    name: "description",
    label: "المحتوى",
    type: "richtext",
    placeholder: "اكتب تفاصيل الخبر هنا...",
  },
  {
    name: "images",
    label: "الصور",
    type: "images",
    placeholder: "رابط الصورة",
  },
  {
    name: "videoUrl",
    label: "رابط الفيديو (إن وجد)",
    type: "url",
    placeholder: "https://youtube.com/...",
  },
  {
    name: "publisher",
    label: "الناشر (اختياري)",
    type: "text",
    placeholder: "اسم الناشر",
  },
  {
    name: "link",
    label: "رابط خارجي (إن وجد)",
    type: "url",
    placeholder: "https://example.com/...",
  },
  {
    name: "linkTitle",
    label: "نص رابط إضافي",
    type: "text",
    placeholder: "مثال: انقر هنا 👆",
  },
  {
    name: "published",
    label: "منشور",
    type: "switch",
    defaultValue: true,
  },
  {
    name: "createdAt",
    label: "تاريخ النشر",
    type: "date",
    placeholder: "تاريخ النشر",
  },
];

export default function NewsManager() {
  const { data: news = [], isLoading } = useNews();
  const createNewsMutation = useCreateNews();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<News | null>(null);

  // Update mutation that uses the editingItem id
  const updateNewsMutation = useMutation({
    mutationFn: (data: Partial<News>) => {
      if (!editingItem) throw new Error("No item to update");
      return apiClient<News>(`api/news/${editingItem.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", editingItem?.id] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: News) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const filteredNews = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return news;
    return news.filter((item) =>
      [item.title, item.description ?? "", item.publisher ?? ""].some((field) =>
        field.toLowerCase().includes(q.toLowerCase())
      )
    );
  }, [news, searchQuery]);

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
      // لاحقاً يمكن ربطه بنظام تنبيهات موحد
      console.error("Failed to submit news", error);
    }
  };

  return (
    <>
      <DashboardSection
        title="إدارة الأخبار"
        description="إضافة وتعديل وحذف الأخبار"
        actionLabel="إضافة خبر جديد"
        onAction={handleAdd}
      >
        <div className="space-y-4">
          <DashboardSearchBar
            placeholder="البحث في الأخبار..."
            onSearch={setSearchQuery}
          />

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الناشر</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">تاريخ الإضافة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((item) => (
                  <NewsRow
                    key={item.id}
                    news={item}
                    onEdit={handleEdit}
                  />
                ))}

                {!isLoading && filteredNews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      لا توجد أخبار حالياً
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DashboardSection>

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

interface NewsRowProps {
  news: News;
  onEdit: (news: News) => void;
}

function NewsRow({ news, onEdit }: NewsRowProps) {
  const deleteMutation = useDeleteNews(news.id);

  const handleDelete = async () => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الخبر؟");
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error("Failed to delete news", error);
    }
  };

  const createdDate = news.createdAt
    ? new Date(news.createdAt).toLocaleDateString("ar-EG")
    : "-";

  return (
    <TableRow>
      <TableCell className="font-medium">{news.title}</TableCell>
      <TableCell>{news.publisher || "-"}</TableCell>
      <TableCell>
        <Badge variant={news.published ? "default" : "secondary"}>
          {news.published ? "منشور" : "مسودة"}
        </Badge>
      </TableCell>
      <TableCell>{createdDate}</TableCell>
      <TableCell>
        <DashboardRowActions
          actions={[
            { icon: Edit, onClick: () => onEdit(news) },
            { icon: Trash2, variant: "destructive", onClick: handleDelete },
          ]}
        />
      </TableCell>
    </TableRow>
  );
}

