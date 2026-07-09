import { StudentResourcesManager } from "@/components/admin/student-resources-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminStudentResourcesPage() {
  return (
    <AdminShell title="Manage Student Resources">
      <StudentResourcesManager />
    </AdminShell>
  );
}
