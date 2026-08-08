import { NextResponse } from 'next/server';
import mediaData from '@/data/media-coverage.json';
import type { MediaCoverageData } from '@/types';

export async function GET() {
  try {
    const data = mediaData as MediaCoverageData;
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load media coverage data',
      },
      { status: 500 }
    );
  }
}
