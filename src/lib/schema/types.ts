import type {
  WithContext,
  Organization as SchemaOrganization,
  WebSite as SchemaWebSite,
  WebPage as SchemaWebPage,
  BreadcrumbList as SchemaBreadcrumbList,
  Event as SchemaEvent,
  FAQPage as SchemaFAQPage,
  ImageGallery as SchemaImageGallery,
  Article as SchemaArticle,
  NewsArticle as SchemaNewsArticle,
  ImageObject as SchemaImageObject,
  Place as SchemaPlace,
  Person as SchemaPerson,
  Graph as SchemaGraph,
  Thing,
} from 'schema-dts';

export type { WithContext };

export interface IdReference {
  '@id': string;
}

export type OrganizationSchema = WithContext<SchemaOrganization>;
export type WebSiteSchema = WithContext<SchemaWebSite>;
export type WebPageSchema = WithContext<SchemaWebPage>;
export type BreadcrumbListSchema = WithContext<SchemaBreadcrumbList>;
export type EventSchema = WithContext<SchemaEvent>;
export type FAQPageSchema = WithContext<SchemaFAQPage>;
export type ImageGallerySchema = WithContext<SchemaImageGallery>;
export type ArticleSchema =
  WithContext<SchemaNewsArticle> | WithContext<SchemaArticle>;

export interface BreadcrumbItemInput {
  name: string;
  url: string;
}

export interface WebPageOptions {
  title: string;
  description: string;
  url: string;
  image?: string | string[] | SchemaImageObject;
  breadcrumb?: BreadcrumbItemInput[] | SchemaBreadcrumbList;
  datePublished?: string;
  dateModified?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';
}

export interface SubEventOptions {
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  locationName?: string;
}

export interface EventOptions {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  type?: 'Event' | 'Festival';
  id?: string;
  alternateName?: string;
  image?: string | string[];
  location?: SchemaPlace;
  isAccessibleForFree?: boolean;
  subEvent?: SubEventOptions[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ImageGalleryItemInput {
  url: string;
  caption?: string;
  name?: string;
}

export interface ImageGalleryOptions {
  title: string;
  description: string;
  url: string;
  images: Array<string | ImageGalleryItemInput>;
}

export interface ArticleOptions {
  headline: string;
  description: string;
  url: string;
  image?: string | string[];
  author?: SchemaPerson | SchemaOrganization | IdReference;
  datePublished: string;
  dateModified?: string;
  type?: 'Article' | 'NewsArticle' | 'BlogPosting';
}

export type AnySchemaObject =
  | OrganizationSchema
  | WebSiteSchema
  | WebPageSchema
  | BreadcrumbListSchema
  | EventSchema
  | FAQPageSchema
  | ImageGallerySchema
  | ArticleSchema
  | Thing;

export type JsonLdInput = AnySchemaObject | AnySchemaObject[] | SchemaGraph;
