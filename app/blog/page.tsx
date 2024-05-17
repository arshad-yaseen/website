import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Arshad Yaseen's blog posts.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts />
    </section>
  );
}
