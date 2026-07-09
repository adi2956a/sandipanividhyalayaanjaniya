import { HomepageManager } from "@/components/admin/homepage-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminHomepagePage() {
  return (
    <AdminShell title="Homepage Content">
      <HomepageManager />
    </AdminShell>
  );
}
