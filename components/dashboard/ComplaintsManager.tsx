import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";

// بإمكانك لاحقًا تمرير complaints عبر props إذا ربطته بقاعدة بيانات سيرفرية فعلية
  const complaints = [
  { id: 1, name: "أحمد علي", phone: "0501234567", date: "2024-01-15", status: "قيد المراجعة", type: "شكوى" },
  { id: 2, name: "فاطمة محمد", phone: "0509876543", date: "2024-01-14", status: "تم الحل", type: "اقتراح" },
  { id: 3, name: "عبدالله حسن", phone: "0507654321", date: "2024-01-13", status: "جديد", type: "شكوى" }
  ];

function getStatusColor(status: string) {
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة الشكاوي والاقتراحات</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              متابعة ومعالجة الشكاوي والاقتراحات الواردة
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث في الشكاوي..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
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
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.name}</TableCell>
                    <TableCell>{complaint.phone}</TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>
                      <Badge variant={complaint.type === "شكوى" ? "destructive" : "default"}>{complaint.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                        <Button variant="ghost" size="icon"><XCircle className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
