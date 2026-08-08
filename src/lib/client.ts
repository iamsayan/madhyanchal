import { CockpitClient } from '@/lib/cockpit';

const cockpit = new CockpitClient({
  host: process.env.NEXT_PUBLIC_API_URL!,
  apiKey: process.env.API_KEY!,
});

export default cockpit;

export type * from '@/lib/cockpit';
