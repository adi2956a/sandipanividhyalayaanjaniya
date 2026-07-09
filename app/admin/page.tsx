import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Administration</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-primary">School content management portal</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Use this panel to manage notices, gallery items, downloads, homepage highlights, and
            site settings. Connect NextAuth credentials and MongoDB to make the workflow fully live.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

