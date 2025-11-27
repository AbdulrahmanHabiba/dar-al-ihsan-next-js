import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, TrendingUp, ExternalLink } from "lucide-react";

  const stories = [
  { id: 1, title: "رحلة حفظ 30 جزء في عام واحد", published: true, hasLink: true, views: 342 },
  { id: 2, title: "من الصفر إلى الإجازة", published: true, hasLink: false, views: 198 },
  { id: 3, title: "قصة طالب متميز", published: false, hasLink: true, views: 0 },
  ];

export default function SuccessStoriesManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>إدارة قصص النجاح</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">عرض وإدارة قصص النجاح الملهمة</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة قصة جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="البحث في قصص النجاح..." className="pr-10" />
            </div>
            <Button variant="outline">بحث</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">رابط خارجي</TableHead>
                  <TableHead className="text-right">المشاهدات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="font-medium">{story.title}</span></div></TableCell>
                    <TableCell><Badge variant={story.published ? "default" : "secondary"}>{story.published ? "منشور" : "مسودة"}</Badge></TableCell>
                    <TableCell>{story.hasLink ? (<div className="flex items-center gap-1 text-sm text-blue-600"><ExternalLink className="h-3 w-3" />موجود</div>) : (<span className="text-sm text-muted-foreground">-</span>)}</TableCell>
                    <TableCell>{story.views}</TableCell>
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
