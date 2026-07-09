import { DownloadsManager } from "@/components/admin/downloads-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminDownloadsPage() {
  return (
    <AdminShell title="Manage Downloads">
      <DownloadsManager />
    </AdminShell>
  );
}
