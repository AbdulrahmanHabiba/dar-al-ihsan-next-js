import { DashboardSection } from "./layout/DashboardSection";
import { DashboardSearchBar } from "./layout/DashboardSearchBar";
import { DashboardRowActions } from "./layout/DashboardRowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Edit, Trash2, Plus } from "lucide-react";
import { teachersData } from "@/lib/dashboard/mockData";

export default function TeachersManager() {
  return (
    <DashboardSection
      title="إدارة المعلمين"
      description="إضافة وتعديل معلومات المعلمين"
      actionLabel="إضافة معلم جديد"
      onAction={() => console.log("Add teacher")}
    >
      <div className="space-y-4">
        <DashboardSearchBar
          placeholder="البحث عن معلم..."
          onSearch={(value) => console.log("Searching teachers:", value)}
        />

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
              {teachersData.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback>{teacher.name.split(" ")[0][0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.specialty}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {teacher.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {teacher.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DashboardRowActions
                      actions={[
                        { icon: Edit, onClick: () => console.log("Edit teacher", teacher.id) },
                        { icon: Trash2, variant: "destructive", onClick: () => console.log("Delete teacher", teacher.id) },
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
