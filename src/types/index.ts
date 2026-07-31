import type { Asset, Entity, SingletonEntity, TreeEntity } from '@/lib/cockpit';

export type ImagePreset =
  | 'thumbnail'
  | 'small'
  | 'medium'
  | 'large'
  | 'hero'
  | 'tailwind_sm'
  | 'tailwind_md'
  | 'tailwind_lg'
  | 'tailwind_xl'
  | 'tailwind_2xl'
  | 'next_xs'
  | 'next_sm'
  | 'next_md'
  | 'next_lg'
  | 'next_xl'
  | 'next_2xl'
  | 'next_3xl'
  | 'aspect_square'
  | 'aspect_video'
  | 'aspect_banner'
  | 'aspect_card'
  | 'aspect_tall'
  | 'product_thumb'
  | 'product_gallery'
  | 'avatar_small'
  | 'avatar_large'
  | 'favicon'
  | 'logo'
  | 'og_image'
  | 'masonry_column'
  | 'lazy_placeholder'
  | 'bw_cover'
  | 'vintage_photo'
  | 'blurred_hero'
  | 'pixel_art'
  | 'high_contrast'
  | 'blueprint'
  | 'embossed_art';

export interface Member extends Entity {
  name: string;
  phone: string;
  amount: string;
}

export interface MemberLink {
  _id: string;
  model: 'members' | string;
}

export interface MembershipPayment2026 extends Entity {
  member: MemberLink;
  amount: string;
  mode: string;
  phone: string;
  email: string;
  payment_id: string;
  order_id: string;
  notes: string | null;
  timestamp: string;
}

export interface EventDate {
  date: string;
  event: string;
  information: string;
}

export interface SiteStats {
  engagement: string;
  followers: string;
  reach: string;
  subscribers: string;
  visitors: string;
}

export interface Settings extends SingletonEntity {
  dates: EventDate[];
  stats: SiteStats;
  membership_year: number;
}

export interface DressOrder extends Entity {
  name: string;
  quantity: string[];
  amount: string;
  mode: string;
  phone: string;
  email: string;
  payment_id: string;
  order_id: string;
  timestamp: string;
}

export interface HomepageVideo {
  title: string;
  video_id: string;
}

export interface Homepage extends SingletonEntity {
  hero_images: Asset[];
  slider_images: Asset[];
  videos: HomepageVideo[];
}

export interface GalleryItem extends Entity {
  year: string;
  images: Asset[];
}

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open(): void };
  }
}
