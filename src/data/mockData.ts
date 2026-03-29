// src/data/mockData.ts

// Helper to generate realistic recent dates
const now = Date.now();
const min = 60000;
const hr = 3600000;
const day = 86400000;

//mogo conn


// ─── Platform Stats ────────────────────────────────────────────────────────
export const MOCK_STATS = {
  total_docs: 14,
  safe_docs: 11,
  total_links: 7,
  total_pdfs: 7,
  private_count: 5,
  public_count: 4,
  restricted_count: 3,
  trash_count: 2,
};

// ─── Public Workspace (Safe, open knowledge) ───────────────────────────────
export const MOCK_PUBLIC = [
  { id: 'pub_1', type: 'link', title: 'Stanford AI Index Report 2024', sub: 'https://hai.stanford.edu/research/ai-index', url: 'https://hai.stanford.edu/research/ai-index', tags: ['AI', 'Research', '2024'], match: '98%', status: 'SAFE', created_at: new Date(now - 2 * hr).toISOString() },
  { id: 'pub_2', type: 'pdf', title: 'Open_Source_Guidelines.pdf', sub: 'Community standards • 1.2 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Guidelines', 'OSS', 'Public'], match: '92%', status: 'SAFE', created_at: new Date(now - 5 * hr).toISOString() },
  { id: 'pub_3', type: 'link', title: 'React Native Documentation', sub: 'https://reactnative.dev/docs', url: 'https://reactnative.dev/docs', tags: ['Mobile', 'Docs', 'Framework'], match: '88%', status: 'SAFE', created_at: new Date(now - 1 * day).toISOString() },
  { id: 'pub_4', type: 'pdf', title: 'Q1_Marketing_Brochure.pdf', sub: 'Public release • 4.5 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Marketing', 'Q1', 'Design'], match: '85%', status: 'SAFE', created_at: new Date(now - 3 * day).toISOString() },
];

// ─── Private Workspace (Internal company data, Safe but protected) ─────────
export const MOCK_PRIVATE = [
  { id: 'priv_1', type: 'pdf', title: 'Q3_Financial_Summary.pdf', sub: 'Internal finance • 2.8 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Finance', 'Q3', 'Internal'], match: '95%', status: 'SAFE', created_at: new Date(now - 30 * min).toISOString() },
  { id: 'priv_2', type: 'link', title: 'Engineering Team Wiki', sub: 'https://internal.notion.so/engineering', url: 'https://internal.notion.so/engineering', tags: ['Engineering', 'Wiki', 'Internal'], match: '90%', status: 'SAFE', created_at: new Date(now - 4 * hr).toISOString() },
  { id: 'priv_3', type: 'pdf', title: 'Project_Phoenix_Architecture.pdf', sub: 'System design specs • 5.1 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Architecture', 'Phoenix', '+2'], match: '89%', status: 'SAFE', created_at: new Date(now - 2 * day).toISOString() },
  { id: 'priv_4', type: 'link', title: 'Staging Server Dashboard', sub: 'https://staging.app.internal', url: 'https://staging.app.internal', tags: ['DevOps', 'Staging', 'Monitoring'], match: '82%', status: 'SAFE', created_at: new Date(now - 4 * day).toISOString() },
  { id: 'priv_5', type: 'pdf', title: 'Client_Onboarding_Draft.pdf', sub: 'Sales playbook • 1.9 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Sales', 'Draft', 'Playbook'], match: '78%', status: 'REVIEW', created_at: new Date(now - 5 * day).toISOString() },
];

// ─── Restricted Workspace (Flagged content, PII, sensitive data) ───────────
export const MOCK_RESTRICTED = [
  { id: 'rest_1', type: 'pdf', title: 'Employee_Salaries_2024.pdf', sub: 'HR Data • 0.8 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['HR', 'Payroll', 'PII'], match: '99%', status: 'FLAGGED', created_at: new Date(now - 10 * min).toISOString() },
  { id: 'rest_2', type: 'pdf', title: 'Merger_Acquisition_TermSheet.pdf', sub: 'Legal • 3.4 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tags: ['Legal', 'M&A', 'Confidential'], match: '97%', status: 'RESTRICTED', created_at: new Date(now - 1 * hr).toISOString() },
  { id: 'rest_3', type: 'link', title: 'Production DB Credentials', sub: 'https://vault.internal/secrets/prod-db', url: 'https://vault.internal/secrets/prod-db', tags: ['Security', 'Secrets', 'Critical'], match: '100%', status: 'FLAGGED', created_at: new Date(now - 12 * hr).toISOString() },
];

// ─── Trash Workspace ───────────────────────────────────────────────────────
export const MOCK_TRASH = [
  { id: 'trash_1', type: 'pdf', title: 'Old_Brand_Guidelines_2021.pdf', name: 'Old_Brand_Guidelines_2021.pdf', sub: 'Deleted 2 days ago', deletedAt: 'Deleted 2 days ago', tags: [], status: 'TRASH' },
  { id: 'trash_2', type: 'link', title: 'Deprecated API V1', name: 'Deprecated API V1', sub: 'Deleted 5 days ago', deletedAt: 'Deleted 5 days ago', tags: [], status: 'TRASH' },
];

// ─── Dashboard Recent Activity (Combined slice of the most recent actions) ─
export const MOCK_RECENT = [
  MOCK_RESTRICTED[0], // Employee Salaries (10 mins ago)
  MOCK_PRIVATE[0],    // Q3 Financials (30 mins ago)
  MOCK_RESTRICTED[1], // M&A Term Sheet (1 hr ago)
  MOCK_PUBLIC[0],     // Stanford AI (2 hrs ago)
  MOCK_PRIVATE[1],    // Eng Wiki (4 hrs ago)
];

// ─── System Logs ───────────────────────────────────────────────────────────
export const MOCK_LOGS = [
  { id: 1, message: 'Employee_Salaries_2024.pdf flagged for PII', timestamp: '10 minutes ago', status: 'error' },
  { id: 2, message: 'Q3_Financial_Summary.pdf processed',         timestamp: '30 minutes ago', status: 'success' },
  { id: 3, message: 'Merger_Acquisition_TermSheet.pdf restricted',  timestamp: '1 hour ago',     status: 'warning' },
  { id: 4, message: 'Stanford AI Index URL tagged successfully',    timestamp: '2 hours ago',    status: 'success' },
  { id: 5, message: 'System backup completed',                      timestamp: '12 hours ago',   status: 'info' },
];