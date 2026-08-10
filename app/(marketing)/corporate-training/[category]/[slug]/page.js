export default async function CoursePage({ params }) {
  const { category, slug } = await params;

  return (
    <div>
      <h1>{slug}</h1>
      <p>Category: {category}</p>
    </div>
  );
}
