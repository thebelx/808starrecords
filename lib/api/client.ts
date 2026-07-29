const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function apiFetch<T>(endpoint: string): Promise<T> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json() as Promise<T>;
  }
  throw new Error("Mock API only — set NEXT_PUBLIC_API_URL for live data");
}

export { API_BASE_URL };
