import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Award } from "lucide-react";

  const graduates = [
  { id: 1, name: "محمد عبدالله", year: "2024", achievement: "حفظ كامل", grade: "ممتاز", avatar: "" },
  { id: 2, name: "فاطمة أحمد", year: "2024", achievement: "حفظ كامل", grade: "ممتاز", avatar: "" },
  { id: 3, name: "عمر حسن", year: "2023", achievement: "15 جزء", grade: "جيد جداً", avatar: "" },
  ];

export default function GraduatesManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة الخريجين</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">عرض وإدارة معلومات الخريجين</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة خريج جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث عن خريج..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الخريج</TableHead>
                  <TableHead className="text-right">السنة</TableHead>
                  <TableHead className="text-right">الإنجاز</TableHead>
                  <TableHead className="text-right">التقدير</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {graduates.map((graduate) => (
                  <TableRow key={graduate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={graduate.avatar} />
                          <AvatarFallback>{graduate.name.split(" ")[0][0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{graduate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{graduate.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        {graduate.achievement}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={graduate.grade === "ممتاز" ? "default" : "secondary"}>{graduate.grade}</Badge>
                    </TableCell>
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
