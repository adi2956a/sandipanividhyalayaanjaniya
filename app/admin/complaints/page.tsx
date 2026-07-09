import { ComplaintsManager } from "@/components/admin/complaints-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminComplaintsPage() {
  return (
    <AdminShell title="Anonymous Complaints">
      <ComplaintsManager />
    </AdminShell>
  );
}
