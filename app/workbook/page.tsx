import type { Metadata } from "next";
import Link from "next/link";
import { CaptureForm } from "@/components/CaptureForm";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "The Digital Workbook: Money Skills, Strong Minds",
  description:
    "The companion workbook to Money Skills, Strong Minds: the book's activities in fillable form, plus weekly reminders to actually do them.",
};

export default function WorkbookPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageViewTracker />
      <SiteHeader />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Companion to the book
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
            The Digital Workbook
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            You scanned the code inside <strong>Money Skills, Strong Minds</strong>. The digital
            workbook takes the book&apos;s activities and makes them something you actually finish:
            fillable on your phone, saved as you go, one small step at a time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">What you&apos;ll get</h2>
        <ul className="mt-6 space-y-4">
          {[
            ["The activities, in fillable form", "Every worksheet and reflection from the book, ready to complete on your phone or computer."],
            ["Your progress, saved", "Pick up where you left off. Your answers stay on your device."],
            ["A weekly nudge", "One short reminder a week to do the next activity with your child, so the book doesn't end up on a shelf."],
            ["Matched to the 7 stages", "Activities grouped by your child's developmental stage, so you're always working on the right thing."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-emerald-900">{title}</h3>
              <p className="mt-1 text-sm text-stone-600">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="notify" className="border-y border-stone-200 bg-emerald-900 text-white">
        <div className="mx-auto grid max-w-4xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">The workbook is being built now</h2>
            <p className="mt-3 text-emerald-100">
              It goes live with the book in November 2026. Leave your email and we&apos;ll send it
              to you the moment it&apos;s ready. Your weekly reminders start when you want them.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6">
            <CaptureForm
              source="workbook"
              nameLabel="First name"
              submitLabel="Notify me when it's ready"
              successTitle="You're on the list"
              successBody="We'll email you the workbook as soon as it launches."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="text-stone-700">
          Don&apos;t have the book yet?{" "}
          <Link href="/book" className="font-medium text-emerald-800 underline">
            Read the first 3 chapters free
          </Link>
          .
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
