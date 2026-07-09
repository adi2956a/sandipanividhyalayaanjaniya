import { GalleryManager } from "@/components/admin/gallery-manager";
import { AdminShell } from "@/components/admin/shell";

export default function AdminGalleryPage() {
  return (
    <AdminShell title="Manage Gallery">
      <GalleryManager />
    </AdminShell>
  );
}
