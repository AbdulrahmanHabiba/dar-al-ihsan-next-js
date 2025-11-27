import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react";

  const teachers = [
  { id: 1, name: "أحمد محمد", email: "ahmed@dar.com", phone: "0501234567", specialty: "تحفيظ القرآن", avatar: "" },
  { id: 2, name: "محمود إبراهيم", email: "mahmoud@dar.com", phone: "0509876543", specialty: "التجويد", avatar: "" },
  { id: 3, name: "عبدالله خالد", email: "abdullah@dar.com", phone: "0507654321", specialty: "التفسير", avatar: "" },
  ];

export default function TeachersManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة المعلمين</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">إضافة وتعديل معلومات المعلمين</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة معلم جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث عن معلم..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المعلم</TableHead>
                  <TableHead className="text-right">التخصص</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">الجوال</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>{teacher.name.split(' ')[0][0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.specialty}</TableCell>
                    <TableCell><div className="flex items-center gap-1 text-sm"><Mail className="h-3 w-3 text-muted-foreground" />{teacher.email}</div></TableCell>
                    <TableCell><div className="flex items-center gap-1 text-sm"><Phone className="h-3 w-3 text-muted-foreground" />{teacher.phone}</div></TableCell>
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
