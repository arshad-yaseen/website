import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Arshad Yaseen
      </h1>
      <p className="mb-4">
        {`I'm a Frontend engineer who does backend stuff too. Also into ML.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
