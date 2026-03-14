import { Document, Stats, LogEntry, CategoryType, DocumentType } from '../types';

// ─── Change this to your FastAPI server ───────────────────────────────────────
// Android emulator : 'http://10.0.2.2:8000'
// iOS simulator    : 'http://localhost:8000'
// Physical device  : 'http://YOUR_LAN_IP:8000'
export const BASE_URL = 'http://10.0.2.2:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export const fetchStats = (): Promise<Stats> =>
  apiFetch<Stats>('/stats');

export const fetchDocuments = (
  category?: CategoryType,
  type?: DocumentType,
  search?: string,
): Promise<Document[]> => {
  const p = new URLSearchParams();
  if (category) p.append('category', category);
  if (type)     p.append('type', type);
  if (search)   p.append('search', search);
  const qs = p.toString();
  return apiFetch<Document[]>(`/documents${qs ? `?${qs}` : ''}`);
};

export const fetchRecentDocuments = (): Promise<Document[]> =>
  apiFetch<Document[]>('/documents/recent');

export const fetchDocumentById = (id: string): Promise<Document> =>
  apiFetch<Document>(`/documents/${id}`);

export const deleteDocument = (id: string): Promise<void> =>
  apiFetch<void>(`/documents/${id}`, { method: 'DELETE' });

export const restoreDocument = (id: string): Promise<Document> =>
  apiFetch<Document>(`/documents/${id}/restore`, { method: 'PATCH' });

export const fetchLogs = (): Promise<LogEntry[]> =>
  apiFetch<LogEntry[]>('/logs');
