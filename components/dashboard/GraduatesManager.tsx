import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Award } from "lucide-react";
import { DashboardSearchBar } from "./layout/DashboardSearchBar";
import { DashboardRowActions } from "./layout/DashboardRowActions";
import { graduatesData } from "@/lib/dashboard/mockData";

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
          <DashboardSearchBar
            placeholder="البحث عن خريج..."
            onSearch={(value) => console.log("Searching graduates:", value)}
          />
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
                {graduatesData.map((graduate) => (
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
                      <DashboardRowActions
                        actions={[
                          { icon: Edit, onClick: () => console.log("Edit graduate", graduate.id) },
                          { icon: Trash2, variant: "destructive", onClick: () => console.log("Delete graduate", graduate.id) },
                        ]}
                      />
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
