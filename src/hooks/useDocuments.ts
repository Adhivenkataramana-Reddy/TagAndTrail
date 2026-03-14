import { useState, useEffect, useCallback } from 'react';
import { Document, Stats, CategoryType, DocumentType } from '../types';
import { fetchDocuments, fetchRecentDocuments, fetchStats } from '../api';

// ─── Mock fallback data ────────────────────────────────────────────────────────
const MOCK: Document[] = [
  { id:'1', name:'AI_Paper.pdf',           type:'pdf', category:'private',    tags:['transformer','NLP','BERT'],        score:94, safety:'SAFE', description:'Transformer architecture research', size:'2.4 MB', created_at: new Date(Date.now()-120000).toISOString() },
  { id:'2', name:'Attention Is All You Need', type:'url', category:'private', url:'https://arxiv.org/abs/1706.03762',   tags:['transformer','attention','NLP'],    score:97, safety:'SAFE', created_at: new Date(Date.now()-900000).toISOString() },
  { id:'3', name:'Security_Report.pdf',    type:'pdf', category:'private',    tags:['security','cyber','vulnerabilities'], score:88, safety:'FLAG', description:'Cybersecurity analysis', size:'1.1 MB', created_at: new Date(Date.now()-3600000).toISOString() },
  { id:'4', name:'Supply_Chain_Report.pdf',type:'pdf', category:'public',     tags:['logistics','supply chain','ops'],  score:89, safety:'SAFE', description:'Global logistics 2024', size:'3.2 MB', created_at: new Date(Date.now()-7200000).toISOString() },
  { id:'5', name:'LLM Survey 2024',        type:'url', category:'public',     url:'https://hai.stanford.edu/news',      tags:['LLM','survey','2024','AI'],         score:91, safety:'SAFE', created_at: new Date(Date.now()-10800000).toISOString() },
  { id:'6', name:'OpenAI GPT-4 Report',    type:'url', category:'public',     url:'https://openai.com/research/gpt-4',  tags:['GPT-4','openai','LLM'],            score:96, safety:'SAFE', created_at: new Date(Date.now()-14400000).toISOString() },
  { id:'7', name:'Q3_Finance.pdf',         type:'pdf', category:'restricted', tags:['finance','Q3','revenue'],          score:86, safety:'SAFE', description:'Quarterly overview', size:'0.9 MB', created_at: new Date(Date.now()-18000000).toISOString() },
  { id:'8', name:'Budget_2024.pdf',        type:'pdf', category:'restricted', tags:['budget','finance','2024'],         score:83, safety:'SAFE', description:'Annual budget plan', size:'0.6 MB', created_at: new Date(Date.now()-21600000).toISOString() },
  { id:'9', name:'Legal_Contract_v2.pdf',  type:'pdf', category:'trash',      tags:['legal','contract','terms'],        score:82, safety:'SAFE', description:'Contract draft v2', size:'0.4 MB', created_at: new Date(Date.now()-172800000).toISOString() },
];

const DEFAULT_STATS: Stats = {
  total_docs: 120, safe_docs: 115, total_links: 48, total_pdfs: 72,
  private_count: 34, public_count: 56, restricted_count: 18, trash_count: 12,
};

// ─── useDocuments ──────────────────────────────────────────────────────────────
export const useDocuments = (
  category?: CategoryType,
  type?: DocumentType,
  searchQuery?: string,
) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDocuments(category, type, searchQuery);
      setDocuments(data);
    } catch {
      // Fallback to mock data when API is unreachable
      let filtered = category ? MOCK.filter(d => d.category === category) : MOCK;
      if (type)        filtered = filtered.filter(d => d.type === type);
      if (searchQuery) filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setDocuments(filtered);
    } finally {
      setLoading(false);
    }
  }, [category, type, searchQuery]);

  useEffect(() => { load(); }, [load]);
  return { documents, loading, error, refetch: load };
};

// ─── useStats ──────────────────────────────────────────────────────────────────
export const useStats = () => {
  const [stats, setStats]     = useState<Stats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchStats()
      .then(setStats)
      .catch(() => setStats(DEFAULT_STATS))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
};

// ─── useRecentDocuments ────────────────────────────────────────────────────────
export const useRecentDocuments = () => {
  const [recent, setRecent]   = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchRecentDocuments()
      .then(setRecent)
      .catch(() => setRecent(MOCK.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return { recent, loading };
};
