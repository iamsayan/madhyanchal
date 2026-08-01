/**
 * Cockpit API Client in TypeScript
 * Features complete support for Assets and Content API.
 * Optimized with native Next.js fetch cache/revalidation support.
 */

/**
 * Next.js specific extensions to the standard RequestInit
 */
export interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export interface CockpitConfig {
  /** The host url of your Cockpit installation (e.g. 'https://cockpit.example.com') */
  host: string;
  /** The Cockpit API token or Master API key */
  apiKey: string;
  /** Custom options for fetch requests (e.g. headers, Next.js cache configurations) */
  fetchOptions?: NextRequestInit;
  /** Enable auto tags for fetch requests */
  autoTags?: boolean;
}

// ==========================================
// COMMON INTERFACES & TYPES
// ==========================================

export interface Entity {
  _id: string;
  _created: number;
  _modified: number;
  _cby: string;
  _mby: string;
  _state: -1 | 0 | 1;
}

export interface SingletonEntity extends Entity {
  _model: string;
  _state: 0 | 1;
}

export interface TreeEntity extends Entity {
  _pid: string;
  _o: number;
  _children: TreeEntity[];
}

export type CollectionItem<T extends object = Record<string, unknown>> = (
  Entity | TreeEntity
) &
  T;

export interface CollectionGeneric {
  [key: string]: unknown;
}

export interface PaginatedList<T = CollectionItem> {
  data: T[];
  meta: {
    total: number;
  };
}

// ==========================================
// ASSETS INTERFACES
// ==========================================

export interface Asset extends Entity {
  path: string;
  title: string;
  mime: string;
  type: string;
  description?: string;
  tags?: string[];
  size: number;
  width?: number;
  height?: number;
  colors?: string[];
  altText?: string;
  thumbhash?: string;
  folder?: string;
  _hash?: string;
  fp?: {
    x: number;
    y: number;
  };
}

export interface ListAssetsOptions {
  filter?: Record<string, unknown> | string;
  sort?: Record<string, unknown> | string;
  limit?: number;
  skip?: number;
  fields?: Record<string, unknown> | string;
  folder?: string;
}

export interface ImageOptions {
  /** Resize mode: 'thumbnail' | 'bestFit' | 'resize' | 'fitToWidth' | 'fitToHeight' */
  m?: 'thumbnail' | 'bestFit' | 'resize' | 'fitToWidth' | 'fitToHeight';
  /** Width: number or 'original' */
  w?: number | 'original';
  /** Height: number or 'original' */
  h?: number | 'original';
  /** Quality: 1-100 (default: 80) */
  q?: number;
  /** Output format: 'auto' | 'gif' | 'jpeg' | 'png' | 'webp' | 'bmp' */
  mime?: 'auto' | 'gif' | 'jpeg' | 'png' | 'webp' | 'bmp';
  /** Auto redirect to generated thumbnail URL (0 or 1) */
  re?: 0 | 1;
  /** Output binary instead of URL (0 or 1) */
  o?: 0 | 1;
  /** Cache invalidation time/timestamp */
  t?: string | number;
  /** Smartcrop mode: 'attention' | 'entropy' | 'centre' | 'center' | 'low' | 'high' */
  smartcrop?: 'attention' | 'entropy' | 'centre' | 'center' | 'low' | 'high';
  /** Additional filters */
  f?: string[] | Record<string, unknown>;
  /** Focal point coordinates (e.g., '0.5,0.5') */
  fp?: string;
  /** Rebuild flag (0 or 1) */
  r?: 0 | 1;
  /** Base64 encoding flag (0 or 1) */
  b64?: 0 | 1;
}

export interface ImagePresetOptions {
  /** Auto redirect to generated thumbnail URL (0 or 1) */
  re?: 0 | 1;
  /** Output binary instead of URL (0 or 1) */
  o?: 0 | 1;
}

export interface Preset {
  width?: number | string;
  height?: number | string;
  mode?: string;
  quality?: number;
  mime?: string;
  smartcrop?: string;
  filters?: unknown;
  [key: string]: unknown;
}

export interface UploadAssetsResult {
  uploaded: string[];
  failed: string[];
  assets: Asset[];
}

// ==========================================
// CONTENT INTERFACES
// ==========================================

export type ContentItem = CollectionItem;

export interface ContentItemGetOptions {
  locale?: string;
  fields?: Record<string, unknown> | string;
  populate?: number;
}

export interface ContentItemGetByFilterOptions extends ContentItemGetOptions {
  filter?: Record<string, unknown> | string;
}

export interface ContentItemsListOptions extends ContentItemGetByFilterOptions {
  sort?: Record<string, unknown> | string;
  limit?: number;
  skip?: number;
}

export interface ContentItemsBatchQueryOptions {
  locale?: string;
  populate?: number;
}

export interface ContentItemsBatchModels {
  [modelName: string]: {
    model?: string;
    locale?: string;
    filter?: Record<string, unknown>;
    sort?: Record<string, unknown>;
    fields?: Record<string, unknown>;
    limit?: number;
    skip?: number;
    populate?: number;
  };
}

export interface ContentTreeOptions {
  parent?: string;
  populate?: number;
  fields?: Record<string, unknown> | string;
  locale?: string;
}

export interface ContentAggregateOptions {
  locale?: string;
  populate?: number;
}

// ==========================================
// INBOX & OTHER INTERFACES
// ==========================================

export interface InboxRecord<T = Record<string, unknown>> {
  data: T;
  attachments: unknown[];
  spam: boolean;
  _created: number;
  _id: string;
}

export interface InboxSubmitResponse<T = Record<string, unknown>> {
  success: boolean;
  record: InboxRecord<T>;
}

export class CockpitClient {
  private host: string;
  private apiKey: string;
  private fetchOptions: NextRequestInit;
  private autoTags: boolean;

  constructor(config: CockpitConfig) {
    this.host = config.host.replace(/\/+$/, '');
    this.apiKey = config.apiKey;
    this.fetchOptions = config.fetchOptions || {};
    this.autoTags = config.autoTags || true;
  }

  /**
   * Helper method to build query parameters
   */
  private buildQuery<T extends object>(params: T): string {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (typeof val === 'object') {
          queryParams.set(key, JSON.stringify(val));
        } else {
          queryParams.set(key, String(val));
        }
      }
    });
    const str = queryParams.toString();
    return str ? `?${str}` : '';
  }

  /**
   * Helper method to merge headers of any standard HeadersInit format
   */
  private mergeHeaders(
    ...headersList: Array<HeadersInit | Record<string, string> | undefined>
  ): Record<string, string> {
    const merged: Record<string, string> = {};
    for (const headers of headersList) {
      if (!headers) continue;
      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          merged[key] = value;
        });
      } else if (Array.isArray(headers)) {
        headers.forEach(([key, value]) => {
          merged[key] = value;
        });
      } else {
        Object.entries(headers).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            merged[key] = String(value);
          }
        });
      }
    }
    return merged;
  }

  /**
   * Helper method to perform requests to Cockpit API
   */
  private async request<T = unknown>(
    path: string,
    method: 'GET' | 'POST' | 'DELETE' = 'GET',
    body?: unknown,
    customHeaders?: Record<string, string>,
    extraFetchOptions?: NextRequestInit
  ): Promise<T> {
    const url = `${this.host}/api${path}`;

    const headers = this.mergeHeaders(
      { 'api-key': this.apiKey },
      customHeaders,
      this.fetchOptions.headers,
      extraFetchOptions?.headers
    );

    // Automatically determine default Next.js cache revalidation tags from Cockpit model paths
    let tags: string[] | undefined = extraFetchOptions?.next?.tags;

    if (!tags && this.autoTags && method === 'GET') {
      const [cleanPath, query] = path.split('?');
      const parts = cleanPath.replace(/^\/|\/$/g, '').split('/');

      if (parts[0] === 'content') {
        if (parts[1] === 'items' && parts.length === 2) {
          // Batch query: /content/items?models=...
          if (query) {
            try {
              const modelsParam = new URLSearchParams(query).get('models');
              if (modelsParam) {
                tags = Object.keys(
                  JSON.parse(modelsParam) as Record<string, unknown>
                );
              }
            } catch {
              // Ignore URL parsing or JSON parsing errors
            }
          }
        } else if (parts.length > 1) {
          // The last segment of single-model paths is always the modelName
          tags = [parts[parts.length - 1]];
        }
      } else if (parts[0] === 'assets') {
        tags = ['assets'];
      }
    }

    const options: NextRequestInit = {
      ...this.fetchOptions,
      ...extraFetchOptions,
      method,
      headers,
    };

    if (tags && tags.length > 0) {
      options.next = {
        ...options.next,
        tags,
      };
    }

    if (body) {
      if (body instanceof FormData) {
        options.body = body;
        // Fetch will automatically set content-type with boundary when using FormData
      } else {
        options.body = JSON.stringify(body);
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
        };
      }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 404) {
        return null as unknown as T;
      }
      const errorText = await response.text();
      throw new Error(
        `Cockpit request failed with status ${response.status}: ${errorText}`
      );
    }

    if (response.status === 204 || response.status === 205) {
      return {} as T;
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const text = await response.text();
      return text ? (JSON.parse(text) as T) : ({} as T);
    }

    if (
      contentType.startsWith('image/') ||
      contentType.startsWith('video/') ||
      contentType.startsWith('audio/') ||
      contentType.includes('application/octet-stream')
    ) {
      return (await response.blob()) as unknown as T;
    }

    const text = await response.text();
    return text as unknown as T;
  }

  // ==========================================
  // ASSETS MODULE API
  // ==========================================

  /**
   * Get all assets with optional filtering, sorting and pagination
   */
  async listAssets(
    options: ListAssetsOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<Asset[]> {
    return this.request<Asset[]>(
      `/assets${this.buildQuery(options)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Get asset metadata by ID
   */
  async getAsset(id: string, fetchOptions?: NextRequestInit): Promise<Asset> {
    return this.request<Asset>(
      `/assets/${id}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Upload single or multiple files with metadata
   * Supports standard HTML File object list, FileList, or Blob inputs
   */
  async uploadAssets(
    files: Array<File | Blob> | FileList,
    meta?: {
      title?: string;
      description?: string;
      tags?: string[];
      folder?: string;
      [key: string]: unknown;
    }
  ): Promise<UploadAssetsResult> {
    const formData = new FormData();

    const fileList = files instanceof FileList ? Array.from(files) : files;
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    if (meta) {
      Object.entries(meta).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              if (val !== undefined && val !== null) {
                formData.append(
                  `meta[${key}][]`,
                  typeof val === 'object' ? JSON.stringify(val) : String(val)
                );
              }
            });
          } else if (typeof value === 'object') {
            formData.append(`meta[${key}]`, JSON.stringify(value));
          } else {
            formData.append(`meta[${key}]`, String(value));
          }
        }
      });
    }

    return this.request<UploadAssetsResult>('/assets/upload', 'POST', formData);
  }

  /**
   * Update asset metadata
   */
  async updateAsset(asset: {
    _id: string;
    [key: string]: unknown;
  }): Promise<Asset> {
    return this.request<Asset>('/assets/update', 'POST', { asset });
  }

  /**
   * Delete an asset by ID
   */
  async deleteAsset(id: string): Promise<{ success: boolean; id: string }> {
    await this.request(`/assets/${id}`, 'DELETE');
    return { success: true, id };
  }

  /**
   * Get image thumbnail/optimization URL or binary
   */
  getImageUrl(id: string, options: ImageOptions = {}): string {
    return `${this.host}/api/assets/image/${id}${this.buildQuery({ w: 1024, h: 512, o: 1, ...options })}`;
  }

  /**
   * Get image URL styled with a defined preset
   */
  getImagePresetUrl(
    id: string,
    preset: string,
    options: ImagePresetOptions = {}
  ): string {
    return `${this.host}/api/assets/image/${id}/${preset}${this.buildQuery({
      o: 1,
      ...options,
    })}`;
  }

  /**
   * List available image presets
   */
  async listPresets(
    fetchOptions?: NextRequestInit
  ): Promise<Record<string, Preset>> {
    return this.request<Record<string, Preset>>(
      '/assets/presets',
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  // ==========================================
  // CONTENT MODULE API
  // ==========================================

  /**
   * Get a single content item from a model.
   */
  async getContentItem<T = CollectionItem>(
    model: string,
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    return this.request<T>(
      `/content/item/${model}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Find a single content item matching the provided filters.
   */
  async getContentItemByFilter<T = CollectionItem>(
    model: string,
    options: ContentItemGetByFilterOptions & Record<string, unknown>,
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    return this.request<T>(
      `/content/item/${model}${this.buildQuery(options)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Get a single content item from a collection/tree model by its ID
   */
  async getContentItemById<T = CollectionItem>(
    model: string,
    id: string,
    options: (ContentItemGetOptions & Record<string, unknown>) | ContentItemGetOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    return this.request<T>(
      `/content/item/${model}/${id}${this.buildQuery(options)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Save (create or update) a content item in a collection model
   */
  async saveContentItem<T = CollectionItem>(
    model: string,
    data: Partial<T> & { _id?: string }
  ): Promise<T> {
    return this.request<T>(`/content/item/${model}`, 'POST', { data });
  }

  /**
   * Delete a content item from a collection model by its ID
   */
  async deleteContentItem<T = { success: boolean }>(
    model: string,
    id: string
  ): Promise<T> {
    return this.request<T>(`/content/item/${model}/${id}`, 'DELETE');
  }

  /**
   * Get multiple content items from a collection/tree model
   */
  async listContentItems<T = CollectionItem[]>(
    model: string,
    options: (ContentItemsListOptions & Record<string, unknown>) | ContentItemsListOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    return this.request<T>(
      `/content/items/${model}${this.buildQuery(options)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Batch query list of content items across multiple models in a single request
   */
  async batchListContentItems<
    T = Record<string, { entries: CollectionItem[] }>,
  >(
    models: ContentItemsBatchModels,
    options: ContentItemsBatchQueryOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    const params = { models, ...options };
    return this.request<T>(
      `/content/items${this.buildQuery(params)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Perform database aggregation pipeline on a model
   */
  async aggregateContentItems<T = unknown>(
    model: string,
    pipeline: unknown[],
    options: ContentAggregateOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    const params = { pipeline, ...options };
    return this.request<T>(
      `/content/aggregate/${model}${this.buildQuery(params)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Get hierarchical tree structure of content items for a tree model
   */
  async getContentTree<T = CollectionItem[]>(
    model: string,
    options: ContentTreeOptions = {},
    fetchOptions?: NextRequestInit
  ): Promise<T> {
    return this.request<T>(
      `/content/tree/${model}${this.buildQuery(options)}`,
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }

  /**
   * Submit data to an Inbox form
   */
  async submitInbox<T = InboxSubmitResponse>(
    token: string,
    data: unknown,
    options: Record<string, unknown> = {}
  ): Promise<T> {
    return this.request<T>(
      `/inbox/submit/${token}${this.buildQuery(options)}`,
      'POST',
      { data }
    );
  }

  /**
   * Check system health
   */
  async healthcheck<T = unknown>(fetchOptions?: NextRequestInit): Promise<T> {
    return this.request<T>(
      '/system/healthcheck',
      'GET',
      undefined,
      undefined,
      fetchOptions
    );
  }
}
