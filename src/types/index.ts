export type DocumentType = 'pdf' | 'url';
export type CategoryType = 'private' | 'public' | 'restricted' | 'trash';
export type SafetyStatus = 'SAFE' | 'FLAG' | 'PENDING';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: CategoryType;
  url?: string;
  tags: string[];
  score?: number;
  safety: SafetyStatus;
  description?: string;
  summary?: string;
  size?: string;
  created_at: string;
}

export interface Stats {
  total_docs: number;
  safe_docs: number;
  total_links: number;
  total_pdfs: number;
  private_count: number;
  public_count: number;
  restricted_count: number;
  trash_count: number;
}

export type LogStatus = 'success' | 'warning' | 'error' | 'info';

export interface LogEntry {
  id: number | string;
  message: string;
  timestamp: string;
  status: LogStatus;
}

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined;
  Private: undefined;
  Public: undefined;
  Restricted: undefined;
  Trash: undefined;
  Stats: undefined;
  Logs: undefined;
  Settings: undefined;
};
