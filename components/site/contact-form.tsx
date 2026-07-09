"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<ContactValues>();

  const onSubmit = handleSubmit(async (values) => {
    setStatus("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("Unable to submit right now. Please contact the school office directly.");
      return;
    }

    reset();
    setStatus("Your message has been submitted successfully.");
  });

  return (
    <form className="rounded-3xl border border-border bg-white p-6 shadow-card" onSubmit={onSubmit}>
      <div className="grid gap-4">
        <input className="rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" placeholder="Full Name" {...register("name", { required: true })} />
        <input className="rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" placeholder="Phone Number" {...register("phone", { required: true })} />
        <input className="rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" placeholder="Email Address" type="email" {...register("email")} />
        <textarea className="min-h-32 rounded-2xl border border-border px-4 py-3 outline-none ring-primary/20 focus:ring" placeholder="Message" {...register("message", { required: true })} />
      </div>
      <button className="mt-5 rounded-full bg-accent px-5 py-3 font-semibold text-white disabled:opacity-70" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Send Message"}
      </button>
      {status ? <p className="mt-4 text-sm text-muted">{status}</p> : null}
    </form>
  );
}

