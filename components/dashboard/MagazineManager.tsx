import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react";

  const articles = [
  { id: 1, title: "أهمية حفظ القرآن الكريم", month: "يناير 2024", type: "مقال", status: "منشور" },
  { id: 2, title: "نصائح للحفظ المتقن", month: "يناير 2024", type: "نصائح", status: "منشور" },
  { id: 3, title: "قصة نجاح طالب", month: "فبراير 2024", type: "قصة", status: "مسودة" },
  ];

export default function MagazineManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة المجلة</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">إضافة وتعديل مقالات ومحتويات المجلة</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة مقال جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث في المجلة..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الشهر</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell><div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{article.title}</span></div></TableCell>
                    <TableCell>{article.month}</TableCell>
                    <TableCell><Badge variant="outline">{article.type}</Badge></TableCell>
                    <TableCell><Badge variant={article.status === "منشور" ? "default" : "secondary"}>{article.status}</Badge></TableCell>
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
