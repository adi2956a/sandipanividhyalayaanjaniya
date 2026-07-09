import { PreviousPapersManager } from "@/components/admin/previous-papers-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminPreviousPapersPage() {
  return (
    <AdminShell title="Manage Previous Papers">
      <PreviousPapersManager />
    </AdminShell>
  );
}
