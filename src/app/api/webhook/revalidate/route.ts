import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function handleRevalidate(tag: string) {
  console.log(`Revalidating Next.js cache tag: ${tag}`);
  revalidateTag(tag, 'max');
}

function verifySecret(req: NextRequest): boolean {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret) return true; // Bypass security if no secret is configured in env

  const secret =
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-revalidate-secret');
  return secret === expectedSecret;
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

    // Cockpit webhooks can send an array payload (e.g. ["gears", {...}, true, "content/collections/gears"])
    // or an object payload (e.g. { model: "gears", event: "content.save.after" })
    let model = '';
    if (Array.isArray(body)) {
      model = body[0];
    } else if (typeof body === 'object') {
      model =
        body.model ||
        body.event?.split('.')?.[2] ||
        body.event?.split('.')?.[1];
    }

    if (!model) {
      return NextResponse.json(
        { success: false, error: 'Model name not found in request payload' },
        { status: 400 }
      );
    }

    handleRevalidate(model);

    return NextResponse.json({ success: true, revalidatedTag: model });
  } catch (error) {
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
  try {
    if (!verifySecret(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tag =
      req.nextUrl.searchParams.get('tag') ||
      req.nextUrl.searchParams.get('model');

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter "tag" or "model" is required',
        },
        { status: 400 }
      );
    }

    handleRevalidate(tag);

    return NextResponse.json({ success: true, revalidatedTag: tag });
  } catch (error) {
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
