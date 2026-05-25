import { notFound } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from "fumadocs-ui/layouts/docs/page";
import { docsMdxComponents } from "@/components/docs/mdx-components";
import { docsSource } from "@/lib/docs-source";

type DocsPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function DocsPageRoute({ params }: DocsPageProps) {
  const { slug } = await params;
  const page = docsSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const MdxContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={false}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MdxContent components={docsMdxComponents} />
      </DocsBody>
      {page.data.lastModified && <PageLastUpdate date={page.data.lastModified} />}
    </DocsPage>
  );
}

export function generateStaticParams() {
  return docsSource.generateParams();
}
