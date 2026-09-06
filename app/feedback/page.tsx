import type { Metadata } from "next";
import { CaptureForm } from "@/components/CaptureForm";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Questions & Stories: Money Skills, Strong Minds",
  description:
    "Ask Dr. Marnie a question about the book, or share how your family is using it. She reads every message.",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageViewTracker />
      <SiteHeader />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900">Questions &amp; Stories</h1>
          <p className="mt-4 text-lg text-stone-700">
            Thank you for reading <strong>Money Skills, Strong Minds</strong>. If a chapter raised a
            question, or if something you tried with your child worked (or didn&apos;t), Dr. Marnie
            wants to hear it. She reads every message herself.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 py-16">
        <CaptureForm
          source="feedback"
          nameLabel="Your name"
          emailRequired={false}
          showMessage
          messageRequired
          messageLabel="Your question or story"
          showConsent
          consentLabel="Dr. Marnie may share my story (without my name) to help other families."
          submitLabel="Send to Dr. Marnie"
          successTitle="Message received"
          successBody="Thank you for taking the time. If you asked a question and left your email, Dr. Marnie will reply."
        />
        <p className="mt-6 text-xs text-stone-500">
          Your message goes directly to Dr. Marnie. It is never shared publicly unless you tick the
          box above. For medical concerns about your child, please book a consultation rather than
          using this form.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
