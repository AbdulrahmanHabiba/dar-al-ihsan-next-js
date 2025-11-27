import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

  // بيانات تجريبية
  const newsItems = [
  { id: 1, title: "افتتاح الفصل الدراسي الجديد", date: "2024-01-15", status: "منشور", views: 245 },
  { id: 2, title: "حفل تخريج دفعة 2024", date: "2024-01-10", status: "منشور", views: 456 },
  { id: 3, title: "ورشة عمل للمعلمين", date: "2024-01-08", status: "مسودة", views: 0 },
  ];

export default function NewsManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة الأخبار</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">إضافة وتعديل وحذف الأخبار</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة خبر جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث في الأخبار..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">المشاهدات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsItems.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell className="font-medium">{news.title}</TableCell>
                    <TableCell>{news.date}</TableCell>
                    <TableCell><Badge variant={news.status === "منشور" ? "default" : "secondary"}>{news.status}</Badge></TableCell>
                    <TableCell><div className="flex items-center gap-1"><Eye className="h-4 w-4 text-muted-foreground" />{news.views}</div></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
