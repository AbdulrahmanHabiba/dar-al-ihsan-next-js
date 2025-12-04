import { DashboardSection } from "./DashboardSection";
import { DashboardSearchBar } from "./DashboardSearchBar";
import { DashboardRowActions } from "./DashboardRowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { complaintsData } from "@/lib/dashboard/mockData";

function getStatusVariant(status: string): "default" | "secondary" | "outline" {
  switch (status) {
    case "جديد":
      return "default";
    case "قيد المراجعة":
      return "secondary";
    case "تم الحل":
      return "outline";
    default:
      return "default";
  }
}

export default function ComplaintsManager() {
  return (
    <DashboardSection
      title="إدارة الشكاوي والاقتراحات"
      description="متابعة ومعالجة الشكاوي والاقتراحات الواردة"
    >
      <div className="space-y-4">
        <DashboardSearchBar
          placeholder="البحث في الشكاوي..."
          onSearch={(value) => console.log("Searching complaints:", value)}
        />

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">رقم الجوال</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintsData.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.name}</TableCell>
                  <TableCell>{complaint.phone}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <Badge variant={complaint.type === "شكوى" ? "destructive" : "default"}>
                      {complaint.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DashboardRowActions
                      actions={[
                        { icon: Eye, onClick: () => console.log("View complaint", complaint.id) },
                        { icon: CheckCircle, onClick: () => console.log("Resolve complaint", complaint.id) },
                        { icon: XCircle, variant: "destructive", onClick: () => console.log("Close complaint", complaint.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardSection>
  );
}
