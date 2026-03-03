// Use env or default to localhost:3001 so API is called when backend runs there
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export interface ApiError {
  success: false;
  error: string;
  errors?: { field: string; message: string }[];
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw Object.assign(new Error((data as ApiError).error || res.statusText), {
      status: res.status,
      data,
    });
  }

  return data as T;
}

export function get<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const search = params
    ? '?' +
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  return request<T>(path + search, { method: 'GET' });
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
