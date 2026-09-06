import type { Metadata } from "next";
import Link from "next/link";
import { CaptureForm } from "@/components/CaptureForm";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Money Skills, Strong Minds: the book by Dr. Marnie",
  description:
    "From First Coins to Financial Independence. A neurodevelopmental pediatrician's roadmap for raising financially capable Filipino children, toddlerhood to independence.",
};

const LAUNCH_PRICE = "₱999";
const REGULAR_PRICE = "₱1,499";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageViewTracker />
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              New book · Personal Finance
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Money Skills, Strong Minds
              <span className="align-super text-base">™</span>
            </h1>
            <p className="mt-3 text-xl text-emerald-900">From First Coins to Financial Independence</p>
            <p className="mt-6 border-l-4 border-amber-400 pl-4 text-lg italic text-stone-700">
              &ldquo;Every peso your child spends, saves, or shares is a brain event. And this is
              the book that finally explains why.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#preview"
                className="rounded-md bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Read the first 3 chapters free
              </a>
              <a
                href="#reserve"
                className="rounded-md border border-emerald-800 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
              >
                Reserve your copy ({LAUNCH_PRICE})
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[280px]">
            {/* TODO: replace with the final cover image at /public/book-cover.jpg */}
            <div className="flex aspect-[2/3] items-center justify-center rounded-lg border border-stone-200 bg-gradient-to-b from-emerald-50 to-amber-50 p-6 text-center shadow-sm">
              <span className="text-sm font-medium text-stone-500">
                Money Skills, Strong Minds cover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The thesis */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">Financial behavior is brain behavior</h2>
        <div className="mt-4 space-y-4 text-stone-700">
          <p>
            Most parenting books miss the science. How a child handles money is a window into how
            their brain is developing: attention, impulse control, planning, empathy, and a sense
            of the future.
          </p>
          <p>
            <strong>Money Skills, Strong Minds</strong> gives Filipino parents, educators, and
            clinicians a roadmap for raising financially capable children from toddlerhood to
            independence, grounded in over two decades of developmental science and front-line
            clinical practice.
          </p>
          <p className="text-lg font-medium text-emerald-900">
            Because the goal was never just a bank account. The goal is a strong, independent mind.
          </p>
        </div>
      </section>

      {/* Framework */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-stone-900">
            The 7 Developmental Stages of Financial Literacy
          </h2>
          <p className="mt-4 text-stone-700">
            The book is built around a framework of seven developmental levels. It guides you from a
            three-year-old&apos;s first coin to a teenager&apos;s first investment account. Each
            stage matches what a child&apos;s brain is ready for, with practical, clinically-tested
            strategies for that age.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "What each stage looks like, and the signs your child is ready for the next one",
              "Culturally-rooted Filipino family scenarios you'll recognise",
              "Dedicated guidance for children with ASD, ADHD, and learning differences",
              "Scripts and activities you can use the same day",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-stone-700">
                <span aria-hidden className="mt-1 text-amber-500">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">Who this book is for</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ["Parents", "Raising financially capable kids, one developmental stage at a time."],
            ["Educators", "Bringing money skills into the classroom with a developmental lens."],
            ["Clinicians", "Supporting families where ASD, ADHD, or learning differences are part of the picture."],
          ].map(([who, blurb]) => (
            <div key={who} className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-emerald-900">{who}</h3>
              <p className="mt-2 text-sm text-stone-600">{blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-500">
          The only book of its kind written by a Philippine-based neurodevelopmental specialist.
        </p>
      </section>

      {/* Preview opt-in */}
      <section id="preview" className="scroll-mt-20 border-y border-stone-200 bg-emerald-900 text-white">
        <div className="mx-auto grid max-w-4xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Read the first 3 chapters free</h2>
            <p className="mt-3 text-emerald-100">
              Enter your email and we&apos;ll send you the opening chapters, plus a note when the
              book is available to buy.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6">
            <CaptureForm
              source="book-preview"
              nameLabel="First name"
              submitLabel="Send me the preview"
              successTitle="Check your inbox"
              successBody="Your preview chapters are on the way. Watch for an email from Dr. Marnie."
            />
          </div>
        </div>
      </section>

      {/* Reserve / buy */}
      <section id="reserve" className="scroll-mt-20 mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900">Reserve your copy</h2>
            <p className="mt-3 text-stone-700">
              The book launches in <strong>November 2026</strong>. Reserve now and we&apos;ll
              contact you with payment details as soon as copies are ready to ship.
            </p>
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-stone-700">
              <p>
                <span className="text-lg font-bold text-emerald-900">{LAUNCH_PRICE}</span>{" "}
                <span className="text-stone-500 line-through">{REGULAR_PRICE}</span>{" "}
                launch price, for reservations made before launch week.
              </p>
              <p className="mt-1 text-stone-500">Ships within the Philippines. Direct from Dr. Marnie.</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <CaptureForm
              source="book-reserve"
              nameLabel="Full name"
              showPhone
              showMessage
              messageLabel="Anything we should know? (delivery city, number of copies)"
              submitLabel="Reserve my copy"
              successTitle="You're on the list"
              successBody="Dr. Marnie will message you with payment and delivery details before launch."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-stone-700">
            Questions about the book?{" "}
            <Link href="/feedback" className="font-medium text-emerald-800 underline">
              Send Dr. Marnie a message
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
