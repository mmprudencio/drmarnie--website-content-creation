import type { Metadata } from "next";
import { CaptureForm } from "@/components/CaptureForm";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "The Next Book: AI Literacy for Kids & Teens",
  description:
    "Dr. Marnie's next book helps parents raise children who use AI wisely. Join the interest list to hear first.",
};

export default function NextBookPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageViewTracker />
      <SiteHeader />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Book 2 · In development
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
            Raising kids who use AI wisely
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            After money skills comes a new question every Filipino parent is now facing: how do we
            raise children and teens who think clearly with AI, not around it? Dr. Marnie&apos;s
            next book brings the same developmental, clinical lens to AI literacy.
          </p>
          <p className="mt-3 text-stone-600">
            It&apos;s early. Join the interest list and you&apos;ll be the first to hear as it takes
            shape, and get a say in what it covers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 py-16">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <CaptureForm
            source="next-book"
            nameLabel="First name"
            submitLabel="Keep me posted"
            successTitle="You're on the list"
            successBody="We'll be in touch as the next book develops. Thank you for your interest."
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
