import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Article } from "@/components/docs/article";
import { getPage, getSection, pages, sections } from "@/registry";

type Props = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...pages.map((page) => ({ section: page.slug })),
    ...sections
      .filter((section) => section.docs.length > 0)
      .map((section) => ({
        section: section.slug,
      })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const page = getPage(section);

  return { title: page?.title, description: page?.description };
}

export default async function Page({ params }: Props) {
  const { section } = await params;

  const page = getPage(section);
  if (page) {
    return <Article doc={page} />;
  }

  const first = getSection(section)?.docs[0];
  if (!first) {
    notFound();
  }

  redirect(`/ui/${section}/${first.slug}`);
}
