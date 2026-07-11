import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/db/posts";
import { LeadForm } from "@/components/LeadForm";
import { PageViewTracker } from "@/components/PageViewTracker";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return (
      <main className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            We couldn&apos;t load this article right now. Please refresh the page.
          </div>
        </div>
      </main>
    );
  }

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <PageViewTracker />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/" className="text-sm font-medium text-teal-700 hover:underline">
          ← Back to home
        </Link>
        {post.category && (
          <span className="mt-6 inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
            {post.category}
          </span>
        )}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {post.title}
        </h1>
        {post.published_at && (
          <p className="mt-2 text-sm text-stone-400">
            {new Date(post.published_at).toLocaleDateString()}
          </p>
        )}
        <div className="prose prose-stone mt-8 max-w-none whitespace-pre-wrap text-stone-700">
          {post.body}
        </div>
      </article>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-md px-6 py-16">
          <h2 className="text-2xl font-semibold text-stone-900">Get in Touch</h2>
          <p className="mt-2 text-sm text-stone-600">
            Have a question about this topic? Leave your info and we&apos;ll follow up.
          </p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
