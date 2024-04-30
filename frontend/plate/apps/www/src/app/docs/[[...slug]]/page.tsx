import '@/styles/mdx.css';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@udecode/cn';
import { allDocs } from 'contentlayer/generated';
import { ChevronRight, ExternalLinkIcon } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

// import { formatBytes, getPackageData } from '@/lib/bundlephobia';
import { getTableOfContents } from '@/lib/toc';
import { PackageInfoType } from '@/hooks/use-package-info';
import { badgeVariants } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mdx } from '@/components/mdx-components';
import { DocsPager } from '@/components/pager';
import { DashboardTableOfContents } from '@/components/toc';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || '';
  const doc = allDocs.find((_doc) => _doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

// export async function generateMetadata({
//   params,
// }: DocPageProps): Promise<Metadata> {
//   const doc = getDocFromParams({ params });
//
//   if (!doc) {
//     return {};
//   }
//
//   return {
//     title: doc.title,
//     description: doc.description,
//     openGraph: {
//       title: doc.title,
//       description: doc.description,
//       type: 'article',
//       url: absoluteUrl(doc.slug),
//       images: [
//         {
//           url: siteConfig.ogImage,
//           width: 1200,
//           height: 630,
//           alt: siteConfig.name,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: doc.title,
//       description: doc.description,
//       images: [siteConfig.ogImage],
//       creator: '@shadcn',
//     },
//   };
// }

export async function generateStaticParams(): Promise<
  DocPageProps['params'][]
> {
  const docs = allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));

  return docs;
}

export default async function DocPage({ params }: DocPageProps) {
  const name = params.slug?.[0];

  const isUI = name === 'components';

  const doc = getDocFromParams({ params });

  const packageInfo: PackageInfoType = {
    gzip: '',
    name: '',
    npm: '',
    source: '',
  };
  // const pkg = docToPackage(name);

  // if (pkg) {
  //   const { gzip: gzipNumber } = await getPackageData(pkg.name);
  //   const gzip =
  //     typeof gzipNumber === 'number' ? formatBytes(gzipNumber) : null;
  //
  //   packageInfo.name = pkg.name;
  //   if (gzip) {
  //     packageInfo.gzip = gzip;
  //   }
  //   packageInfo.source =
  //     'https://github.com/udecode/plate/tree/main/packages/' +
  //     pkg.sourcePath +
  //     '/src';
  //   packageInfo.npm = 'https://www.npmjs.com/package/@udecode/' + pkg.name;
  // }

  if (!doc) {
    notFound();
  }

  // let toc: TableOfContents;
  // if (params.slug?.[0] === 'api') {
  //   toc = getAPITableOfContents(doc.body.raw);
  // } else {
  // }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">{isUI ? 'Components' : 'Docs'}</div>
          <ChevronRight className="size-4" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links || doc.docs ? (
          <div className="flex flex-wrap items-center gap-1 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.docs?.map((item) => (
              <Link
                key={item.route}
                href={item.route as any}
                className={cn(
                  badgeVariants({
                    variant: item.route?.includes('components')
                      ? 'default'
                      : 'secondary',
                  })
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} packageInfo={packageInfo} />
        </div>

        <DocsPager doc={doc} />
      </div>

      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="h-full pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
