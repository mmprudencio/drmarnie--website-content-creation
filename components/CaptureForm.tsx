"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CaptureFormProps = {
  /** Stored on the lead as source_path, e.g. "workbook", "feedback", "next-book". */
  source: string;
  nameLabel?: string;
  namePlaceholder?: string;
  showEmail?: boolean;
  emailRequired?: boolean;
  showPhone?: boolean;
  showMessage?: boolean;
  messageLabel?: string;
  messageRequired?: boolean;
  showConsent?: boolean;
  consentLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successTitle?: string;
  successBody?: string;
};

export function CaptureForm({
  source,
  nameLabel = "Name",
  namePlaceholder = "Your name",
  showEmail = true,
  emailRequired = true,
  showPhone = false,
  showMessage = false,
  messageLabel = "Your message",
  messageRequired = false,
  showConsent = false,
  consentLabel = "You may share my story (anonymously) to help other families.",
  submitLabel = "Submit",
  submittingLabel = "Sending…",
  successTitle = "Thank you!",
  successBody = "Your message has been received. Dr. Marnie reads every one.",
}: CaptureFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");
    setErrorMessage("");

    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const consent_share = fd.get("consent_share") === "on";

    if (!name) {
      setFieldError("Please enter your name.");
      return;
    }
    if (showEmail && emailRequired && !email) {
      setFieldError("Please enter your email address.");
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      setFieldError("Please enter a valid email address.");
      return;
    }
    if (showMessage && messageRequired && !message) {
      setFieldError("Please write your message.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          consent_share,
          source_path: source,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-base font-semibold text-emerald-900">{successTitle}</p>
        <p className="mt-1 text-sm text-emerald-800">{successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm text-emerald-700 underline underline-offset-2"
        >
          Submit another response
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium text-stone-700">
          {nameLabel}
        </label>
        <input id="cf-name" name="name" type="text" required className={inputClass} placeholder={namePlaceholder} />
      </div>

      {showEmail && (
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-stone-700">
            Email {emailRequired ? "" : <span className="text-stone-400">(optional)</span>}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required={emailRequired}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      )}

      {showPhone && (
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-stone-700">
            Mobile number <span className="text-stone-400">(optional)</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" className={inputClass} placeholder="09XX XXX XXXX" />
        </div>
      )}

      {showMessage && (
        <div>
          <label htmlFor="cf-message" className="block text-sm font-medium text-stone-700">
            {messageLabel}
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required={messageRequired}
            className={inputClass}
            placeholder="Write as much or as little as you like."
          />
        </div>
      )}

      {showConsent && (
        <label className="flex items-start gap-2 text-sm text-stone-600">
          <input type="checkbox" name="consent_share" className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-700" />
          <span>{consentLabel}</span>
        </label>
      )}

      {fieldError && <p className="text-sm text-red-600">{fieldError}</p>}
      {status === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
