import { DashboardSection } from "./DashboardSection";
import { DashboardSearchBar } from "./DashboardSearchBar";
import { DashboardRowActions } from "./DashboardRowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { newsData } from "@/lib/dashboard/mockData";

export default function NewsManager() {
  return (
    <DashboardSection
      title="إدارة الأخبار"
      description="إضافة وتعديل وحذف الأخبار"
      actionLabel="إضافة خبر جديد"
      onAction={() => console.log("Add news")}
    >
      <div className="space-y-4">
        <DashboardSearchBar
          placeholder="البحث في الأخبار..."
          onSearch={(value) => console.log("Searching for", value)}
        />

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
              {newsData.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>
                    <Badge variant={news.status === "منشور" ? "default" : "secondary"}>
                      {news.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      {news.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DashboardRowActions
                      actions={[
                        { icon: Edit, onClick: () => console.log("Edit", news.id) },
                        { icon: Trash2, variant: "destructive", onClick: () => console.log("Delete", news.id) },
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
