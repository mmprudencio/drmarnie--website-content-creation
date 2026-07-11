import Link from "next/link";
import { getPublishedPosts } from "@/lib/db/posts";
import { getActiveServices } from "@/lib/db/services";
import { getActiveProducts } from "@/lib/db/products";
import { LeadForm } from "@/components/LeadForm";
import { PageViewTracker } from "@/components/PageViewTracker";
import type { Post, Service, Product } from "@/lib/db/types";

async function safeFetch<T>(fn: () => Promise<T>): Promise<{ data: T | null; error: boolean }> {
  try {
    return { data: await fn(), error: false };
  } catch {
    return { data: null, error: true };
  }
}

export default async function Home() {
  const [postsResult, servicesResult, productsResult] = await Promise.all([
    safeFetch<Post[]>(getPublishedPosts),
    safeFetch<Service[]>(getActiveServices),
    safeFetch<Product[]>(getActiveProducts),
  ]);

  return (
    <main className="min-h-screen bg-stone-50">
      <PageViewTracker />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            Dr. Marnie
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Guidance for your child&apos;s development, from a doctor you can trust
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Practical, expert-backed articles on pediatric development, parenting, and
            early intervention — plus services, books, and courses to support your family.
          </p>
        </div>
      </section>

      <section id="posts" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">Latest Articles</h2>
        <div className="mt-6">
          {postsResult.error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              We couldn&apos;t load articles right now. Please refresh the page.
            </div>
          )}
          {!postsResult.error && (postsResult.data?.length ?? 0) === 0 && (
            <p className="rounded-md border border-stone-200 bg-white px-4 py-6 text-center text-stone-500">
              No posts yet — check back soon.
            </p>
          )}
          {!postsResult.error && (postsResult.data?.length ?? 0) > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postsResult.data!.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group block rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
                >
                  {post.category && (
                    <span className="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                      {post.category}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-semibold text-stone-900 group-hover:text-teal-800">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-600">{post.body}</p>
                  {post.published_at && (
                    <p className="mt-3 text-xs text-stone-400">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="services" className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-stone-900">Services</h2>
          <div className="mt-6">
            {servicesResult.error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                We couldn&apos;t load services right now. Please refresh the page.
              </div>
            )}
            {!servicesResult.error && (servicesResult.data?.length ?? 0) === 0 && (
              <p className="rounded-md border border-stone-200 px-4 py-6 text-center text-stone-500">
                No services listed yet.
              </p>
            )}
            {!servicesResult.error && (servicesResult.data?.length ?? 0) > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {servicesResult.data!.map((service) => (
                  <div key={service.id} className="rounded-lg border border-stone-200 p-5">
                    <h3 className="text-lg font-semibold text-stone-900">{service.title}</h3>
                    {service.description && (
                      <p className="mt-2 text-sm text-stone-600">{service.description}</p>
                    )}
                    {service.appointment_url && (
                      <a
                        href={service.appointment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline"
                      >
                        Book an appointment →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">Books &amp; Courses</h2>
        <div className="mt-6">
          {productsResult.error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              We couldn&apos;t load products right now. Please refresh the page.
            </div>
          )}
          {!productsResult.error && (productsResult.data?.length ?? 0) === 0 && (
            <p className="rounded-md border border-stone-200 bg-white px-4 py-6 text-center text-stone-500">
              No products listed yet.
            </p>
          )}
          {!productsResult.error && (productsResult.data?.length ?? 0) > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {productsResult.data!.map((product) => (
                <div key={product.id} className="rounded-lg border border-stone-200 bg-white p-5">
                  <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium capitalize text-amber-700">
                    {product.type}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-stone-900">{product.title}</h3>
                  {product.description && (
                    <p className="mt-2 text-sm text-stone-600">{product.description}</p>
                  )}
                  {product.external_url && (
                    <a
                      href={product.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-md px-6 py-16">
          <h2 className="text-2xl font-semibold text-stone-900">Get in Touch</h2>
          <p className="mt-2 text-sm text-stone-600">
            Have a question or want to schedule a consultation? Leave your info and we&apos;ll
            follow up.
          </p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-400">
        <Link href="/admin" className="hover:text-stone-600">
          Admin
        </Link>
      </footer>
    </main>
  );
}
