'use server';

import cockpit from '@/lib/client';

export async function submitModel(
  model: string,
  data: Record<string, unknown>
) {
  try {
    const response = await cockpit.saveContentItem(model, data);

    return {
      success: true,
      response,
    };
  } catch (error) {
    console.error(`Failed to create ${model}:`, error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    };
  }
}
