import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { createMetadata } from '@/lib/metadata';
import {
  JsonLd,
  webpageSchema,
  breadcrumbSchema,
  articleSchema,
} from '@/lib/schema';
import { Newspaper, Calendar, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Latest News & Official Announcements',
    description:
      'Stay updated with the latest news, announcements, press releases, and festival updates from Madhyanchal Sarbajanin Chandannagar.',
    canonical: '/news',
  }),
};

const articles = [
  {
    slug: 'jagadhatri-puja-2026-preparations-begin',
    headline: 'Grand Preparations Begin for Madhyanchal Jagadhatri Puja 2026',
    description:
      'Madhyanchal Sarbajanin Jagadhatri Puja Samity announces the theme launch, artisan selection, and lighting blueprint for the upcoming 2026 festival.',
    image: '/letter-head-msjps.jpg',
    datePublished: '2026-07-15T10:00:00+05:30',
    dateModified: '2026-08-01T12:00:00+05:30',
  },
  {
    slug: 'durga-puja-drawing-contest-registration-open',
    headline: 'Annual Youth Sit & Draw Art Competition Registration Opens',
    description:
      'Registration opens for the annual youth drawing competition organized during Durga Puja at Madhyanchal Community Hall across 3 age categories.',
    image: '/letter-head-msdps.jpg',
    datePublished: '2026-06-20T09:00:00+05:30',
    dateModified: '2026-06-25T11:00:00+05:30',
  },
];

export default function NewsPage() {
  const newsWebpage = webpageSchema({
    title: 'Latest News & Announcements | Madhyanchal Sarbajanin',
    description:
      'Official press releases, news articles, and notice updates from Madhyanchal Sarbajanin Chandannagar.',
    url: '/news',
    type: 'CollectionPage',
  });

  const newsBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News & Updates', url: '/news' },
  ]);

  const featuredArticleSchema = articleSchema({
    headline: articles[0].headline,
    description: articles[0].description,
    url: `/news/${articles[0].slug}`,
    image: articles[0].image,
    datePublished: articles[0].datePublished,
    dateModified: articles[0].dateModified,
    type: 'NewsArticle',
  });

  return (
    <PageLayout
      title="News & Official Announcements"
      subtitle="Read the latest updates, festival news releases, and committee bulletins from Madhyanchal Sarbajanin."
      badge={{
        text: 'Press & Media Center',
        icon: Newspaper,
      }}
      breadcrumbCurrent="News"
    >
      <JsonLd data={[newsWebpage, newsBreadcrumb, featuredArticleSchema]} />

      <div className="mx-auto max-w-5xl py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-200/60 bg-amber-50/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900/60"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-amber-700 dark:text-amber-400 font-semibold mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.datePublished).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Madhyanchal Media Desk
                  </span>
                </div>
                <h3 className="font-paytone text-xl text-slate-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {article.headline}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
                  {article.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-200/40 dark:border-stone-800 flex items-center justify-between">
                <span className="inline-flex items-center text-sm font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                  Read Full Update <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
