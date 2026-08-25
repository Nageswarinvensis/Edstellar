import Link from "next/link";

import { getBlogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description: "Guides and insights on corporate training, skills and workforce planning.",
    path: "/blog",
  });
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <Section>
      <Text as="h1" className="mb-8">
        Blog
      </Text>

      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <Text as="h3" className="group-hover:text-olive">
                {post.title}
              </Text>
              <Text as="p">{post.description}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
