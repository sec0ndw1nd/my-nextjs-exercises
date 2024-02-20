export default function BlogPostPage({ params }) {
  console.log(params); // check your terminal not browser's console
  return (
    <main>
      <h1>Blog Post</h1>
      <p>You are at {params.slug}!</p>
    </main>
  );
}
