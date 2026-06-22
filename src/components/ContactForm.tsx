"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-surface-dark bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-surface-dark bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-surface-dark bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {t("send")}
      </button>
      {status === "success" && <p className="text-sm text-primary">{t("success")}</p>}
      {status === "error" && <p className="text-sm text-red-600">{t("error")}</p>}
    </form>
  );
}
