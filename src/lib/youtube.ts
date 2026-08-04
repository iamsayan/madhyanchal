import { cacheLife, cacheTag } from 'next/cache';

import type { HomepageVideo } from '@/types';

export const YOUTUBE_CHANNEL_ID = 'UC7ciQ3yoRneAZLMjzSefKdg';

/**
 * Fetches the latest public videos from YouTube Channel RSS Feed.
 * Requires 0 API keys and updates automatically when a new video is published on YouTube.
 */
export async function getYouTubeLatestVideos(
  channelId: string = YOUTUBE_CHANNEL_ID,
  limit: number = 10
): Promise<HomepageVideo[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('youtube-videos');

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );

    if (!res.ok) {
      console.warn(
        `YouTube RSS feed request failed with status: ${res.status}`
      );
      return [];
    }

    const xml = await res.text();
    const entries = xml.split('<entry>');
    const videos: HomepageVideo[] = [];

    for (let i = 1; i < entries.length && videos.length < limit; i++) {
      const entry = entries[i];
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);

      if (videoIdMatch && videoIdMatch[1]) {
        const video_id = videoIdMatch[1].trim();
        let title = titleMatch ? titleMatch[1].trim() : 'Madhyanchal Video';

        // Clean up common HTML entities in XML title
        title = title
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        videos.push({ video_id, title });
      }
    }

    return videos;
  } catch (error) {
    console.error('Error parsing YouTube RSS feed:', error);
    return [];
  }
}
