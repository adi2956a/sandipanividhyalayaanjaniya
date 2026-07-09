import { NoticesManager } from "@/components/admin/notices-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminNoticesPage() {
  return (
    <AdminShell title="Manage Notices">
      <NoticesManager />
    </AdminShell>
  );
}
