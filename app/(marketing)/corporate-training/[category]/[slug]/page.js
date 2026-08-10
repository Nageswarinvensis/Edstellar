import Section from "@/components/ui/Section";

export default async function CoursePage({ params }) {
  const { category, slug } = await params;

  return (
    <Section>
      <h1>Course Page</h1>
      <p>Slug: {slug}</p>
      <p>Category Slug: {category}</p>
    </Section>
  );
}
