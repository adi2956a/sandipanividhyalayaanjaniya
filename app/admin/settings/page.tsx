import { SettingsManager } from "@/components/admin/settings-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Site Settings">
      <SettingsManager />
    </AdminShell>
  );
}
