'use server';

import cockpit from '@/lib/client';

export interface ActionResponse<T = unknown> {
  success: boolean;
  response?: T;
  error?: string;
}

export async function submitModel<
  TResponse = unknown,
  TData extends object = object,
>(model: string, data: TData): Promise<ActionResponse<TResponse>> {
  try {
    const response = await cockpit.createItem<TResponse>(
      model,
      data as Record<string, unknown>
    );

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
