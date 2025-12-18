"use client";

import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, TrendingUp, ExternalLink } from "lucide-react";

const storiesData = [
    { id: 1, title: "رحلة حفظ 30 جزء في عام واحد", published: true, hasLink: true, views: 342 },
    { id: 2, title: "من الصفر إلى الإجازة", published: true, hasLink: false, views: 198 },
    { id: 3, title: "قصة طالب متميز", published: false, hasLink: true, views: 0 },
];

export default function SuccessStoriesPage() {
    const handleAdd = () => {
        console.log("Add success story");
    };

    const handleEdit = (story: typeof storiesData[0]) => {
        console.log("Edit story", story.id);
    };

    const handleDelete = (story: typeof storiesData[0]) => {
        console.log("Delete story", story.id);
    };

    const columns: ColumnDef<typeof storiesData[0]>[] = [
        {
            header: "العنوان",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium">{row.title}</span>
                </div>
            ),
        },
        {
            header: "الحالة",
            cell: (row) => (
                <Badge variant={row.published ? "default" : "secondary"}>
                    {row.published ? "منشور" : "مسودة"}
                </Badge>
            ),
        },
        {
            header: "رابط خارجي",
            cell: (row) =>
                row.hasLink ? (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                        <ExternalLink className="h-3 w-3" />
                        موجود
                    </div>
                ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                ),
        },
        { header: "المشاهدات", accessorKey: "views" },
    ];

    const actions: RowAction<typeof storiesData[0]>[] = [
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between flex-row-reverse gap-4">
                    <div>
                        <CardTitle>إدارة قصص النجاح</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">عرض وإدارة قصص النجاح الملهمة</p>
                    </div>
                    <Button className="gap-2" onClick={handleAdd}>
                        <Plus className="h-4 w-4" />
                        إضافة قصة جديدة
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <GenericDataTable
                    data={storiesData}
                    columns={columns}
                    actions={actions}
                    searchKeys={["title"]}
                    searchPlaceholder="البحث في قصص النجاح..."
                    emptyMessage="لا توجد قصص نجاح حالياً"
                    getRowKey={(row) => row.id}
                />
            </CardContent>
        </Card>
    );
}
