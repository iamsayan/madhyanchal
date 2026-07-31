'use server';

import cockpit from '@/lib/client';
import { InboxSubmitResponse } from '@/lib/cockpit';

export interface ActionResponse<T = unknown> {
  success: boolean;
  response?: T;
  error?: string;
}

export async function submitForm<TData extends object = object>(
  data: TData,
  token: string
): Promise<ActionResponse<InboxSubmitResponse<TData>>> {
  try {
    const response = await cockpit.submitInbox(token, data);

    return {
      success: true,
      response: response as unknown as InboxSubmitResponse<TData>,
    };
  } catch (error) {
    console.error('Form submit error', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    };
  }
}
