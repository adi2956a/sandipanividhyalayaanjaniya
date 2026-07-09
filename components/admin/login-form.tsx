"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/admin/dashboard"
    });

    if (result?.error) {
      setError("Invalid username or password.");
      return;
    }

    window.location.href = result?.url ?? "/admin/dashboard";
  }

  return (
    <form className="rounded-3xl border border-border bg-white p-8 shadow-card" onSubmit={onSubmit}>
      <div className="grid gap-4">
        <input className="rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" name="username" placeholder="Username" required />
        <input className="rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" name="password" placeholder="Password" required type="password" />
      </div>
      <button className="mt-5 w-full rounded-full bg-primary px-5 py-3 font-semibold text-white" type="submit">
        Sign In
      </button>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
