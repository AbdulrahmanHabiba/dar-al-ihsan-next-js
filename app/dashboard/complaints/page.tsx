"use client";

import { useMemo } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { useComplaints, useMarkComplaintAsRead, useDeleteComplaint, Complaint } from "@/hooks/useComplaints";
import { Trash2, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Badge } from "@/components/ui/badge";

export default function ComplaintsDashboardPage() {
    const { data: complaints = [], isLoading } = useComplaints();

    const markAsReadMutation = useMarkComplaintAsRead();
    const deleteMutation = useDeleteComplaint();

    const handleMarkAsRead = async (complaint: Complaint) => {
        try {
            await markAsReadMutation.mutateAsync(complaint.id);
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (complaint: Complaint) => {
        if (window.confirm(`هل أنت متأكد من حذف هذه الرسالة؟`)) {
            try {
                await deleteMutation.mutateAsync(complaint.id); 
            } catch (e) { console.error(e); }
        }
    };

    const columns: ColumnDef<Complaint>[] = [
        { 
            header: "المرسل", 
            cell: (row) => (
                <div className="flex flex-col gap-1">
                    <span className="font-medium">{row.name || "زائر"}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {row.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {row.email}</div>}
                        {row.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {row.phone}</div>}
                    </div>
                </div>
            )
        },
        { header: "الموضوع", accessorKey: "subject", className: "font-bold" },
        { 
            header: "الرسالة", 
            cell: (row) => (
                <div className="max-w-[300px] truncate" title={row.message}>
                    {row.message}
                </div>
            )
        },
        { 
            header: "التاريخ", 
            cell: (row) => (
                <div className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    {new Date(row.createdAt).toLocaleDateString("ar-EG")}
                </div>
            )
        },
        { 
            header: "الحالة", 
            cell: (row) => (
                <Badge variant={row.isRead ? "outline" : "default"}>
                    {row.isRead ? "تمت القراءة" : "جديدة"}
                </Badge>
            )
        },
    ];

    const actions: RowAction<Complaint>[] = [
        { 
            icon: CheckCircle, 
            onClick: handleMarkAsRead,
            variant: "default"
        },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <DashboardSectionCard
            title="الشكاوى والاقتراحات"
            description="إدارة رسائل الزوار والشكاوى والاقتراحات"
        >
            <GenericDataTable
                data={complaints}
                columns={columns}
                actions={actions}
                searchKeys={["name", "subject", "message"]}
                searchPlaceholder="البحث في الرسائل..."
                isLoading={isLoading}
                getRowKey={(row) => row.id}
            />
        </DashboardSectionCard>
    );
}
