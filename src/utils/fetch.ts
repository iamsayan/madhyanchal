interface ApiResponse {
  [key: string]: unknown;
}

type Params = Record<string, unknown>;

function generateUrlSearchParams(basePath: string, obj: Params): string {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      params.append(key, JSON.stringify(obj[key]));
    } else {
      params.append(key, String(obj[key] ?? ''));
    }
  }

  return `${basePath}?${params.toString()}`;
}

async function fetchModel(
  model: string,
  type: 'items' | 'item',
  params: Params = {},
  revalidate: number = 604800
): Promise<ApiResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/${type}/${generateUrlSearchParams(model, params)}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': process.env.API_KEY!,
    },
    next: {
      tags: [`model-${model}`],
      revalidate: process.env.NODE_ENV === 'development' ? 0 : revalidate,
    },
  });

  if (!response.ok) return Promise.reject(response);

  return response.json();
}

export function getModelItems(
  model: string,
  params: Params = {},
  revalidate: number = 604800
): Promise<ApiResponse> {
  return fetchModel(
    model,
    'items',
    { skip: 0, limit: 1000, ...params },
    revalidate
  );
}

export function getModelItem(
  model: string,
  params: Params = {},
  revalidate: number = 604800
): Promise<ApiResponse> {
  return fetchModel(model, 'item', params, revalidate);
}

export async function getImagesData(): Promise<ApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL}/api.php?v=1s`,
    {
      method: 'GET',
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response);
  }
}
