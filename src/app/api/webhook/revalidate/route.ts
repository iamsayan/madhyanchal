import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { verifySecret } from '@/lib/verify';

function handleRevalidate(tag: string) {
  console.log(`Revalidating Next.js cache tag: ${tag}`);
  revalidateTag(tag, 'max');
}

export async function POST(req: NextRequest) {
  try {
    if (!verifySecret(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Empty or invalid JSON payload' },
        { status: 400 }
      );
    }

    const model = Array.isArray(body)
      ? body[0]
      : body?.model ||
        body?.event?.split('.')?.[2] ||
        body?.event?.split('.')?.[1];

    if (!model || typeof model !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Model name not found in request payload' },
        { status: 400 }
      );
    }

    handleRevalidate(model);
    return NextResponse.json({ success: true, revalidatedTag: model });
  } catch (error: unknown) {
    console.error('Error handling revalidation webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tag = searchParams.get('tag') || searchParams.get('model');

  if (!verifySecret(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!tag) {
    return NextResponse.json(
      {
        success: false,
        error: 'Query parameter "tag" or "model" is required',
      },
      { status: 400 }
    );
  }

  try {
    handleRevalidate(tag);
    return NextResponse.json({ success: true, revalidatedTag: tag });
  } catch (error: unknown) {
    console.error('Error executing GET revalidation:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
