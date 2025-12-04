import { DashboardSection } from "./DashboardSection";
import { DashboardSearchBar } from "./DashboardSearchBar";
import { DashboardRowActions } from "./DashboardRowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Edit, Trash2, Plus } from "lucide-react";
import { magazineArticlesData } from "@/lib/dashboard/mockData";

export default function MagazineManager() {
  return (
    <DashboardSection
      title="إدارة المجلة"
      description="إضافة وتعديل مقالات ومحتويات المجلة"
      actionLabel="إضافة مقال جديد"
      onAction={() => console.log("Add article")}
    >
      <div className="space-y-4">
        <DashboardSearchBar
          placeholder="البحث في المجلة..."
          onSearch={(value) => console.log("Searching magazine:", value)}
        />

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
              {magazineArticlesData.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{article.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{article.month}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={article.status === "منشور" ? "default" : "secondary"}>
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DashboardRowActions
                      actions={[
                        { icon: Edit, onClick: () => console.log("Edit article", article.id) },
                        { icon: Trash2, variant: "destructive", onClick: () => console.log("Delete article", article.id) },
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
