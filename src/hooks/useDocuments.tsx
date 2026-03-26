import React, { createContext, useContext, useState } from 'react';
import { 
  MOCK_PUBLIC, 
  MOCK_PRIVATE, 
  MOCK_RESTRICTED, 
  MOCK_TRASH, 
  MOCK_RECENT 
} from '../data/mockData';

// ─── TypeScript Interfaces ──────────────────────────────────────────────────
interface DocumentContextType {
  docs: {
    Public: any[];
    Private: any[];
    Restricted: any[];
    Trash: any[];
  };
  stats: any;
  recent: any[];
  deleteToTrash: (doc: any) => void;
  restoreFromTrash: (doc: any) => void;
  deletePermanently: (id: string | number) => void;
  markAsRecent: (doc: any) => void; // <-- New Stack Function!
}

// ─── The Global Context (The Brain) ─────────────────────────────────────────
const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Core Document State
  const [docs, setDocs] = useState({
    Public: MOCK_PUBLIC.map(d => ({ ...d, category: 'Public' })),
    Private: MOCK_PRIVATE.map(d => ({ ...d, category: 'Private' })),
    Restricted: MOCK_RESTRICTED.map(d => ({ ...d, category: 'Restricted' })),
    Trash: MOCK_TRASH.map(d => ({ ...d, category: 'Public' })), 
  });

  // 2. The Recent Stack (Initialized with max 10 items)
  const [recent, setRecent] = useState(() => {
    return MOCK_RECENT.map(d => ({ ...d, category: d.category || 'Public' })).slice(0, 10);
  });

  // ─── DYNAMIC STATS ────────────────────────────────────────────────────────
  const allActiveDocs = [...docs.Public, ...docs.Private, ...docs.Restricted];
  const dynamicStats = {
    total_docs: allActiveDocs.length,
    total_links: allActiveDocs.filter(d => d.type === 'link' || d.type === 'url').length,
    total_pdfs: allActiveDocs.filter(d => d.type === 'pdf').length,
    private_count: docs.Private.length,
    public_count: docs.Public.length,
    restricted_count: docs.Restricted.length,
    trash_count: docs.Trash.length,
  };

  // ─── THE STACK LOGIC ──────────────────────────────────────────────────────
  const markAsRecent = (doc: any) => {
    setRecent(prevStack => {
      // 1. Remove the doc if it's already in the stack (so we don't duplicate)
      const filteredStack = prevStack.filter(d => d.id !== doc.id);
      
      // 2. Push it to the very front, and slice to strictly keep 10 max
      return [doc, ...filteredStack].slice(0, 10);
    });
  };

  // ─── THE GLOBAL ACTIONS ───────────────────────────────────────────────────
  const deleteToTrash = (doc: any) => {
    const cat = doc.category || 'Public';
    setDocs(prev => ({
      ...prev,
      [cat as keyof typeof prev]: prev[cat as keyof typeof prev].filter(d => d.id !== doc.id), 
      Trash: [{ ...doc, status: 'TRASH', deletedAt: 'Just now' }, ...prev.Trash] 
    }));
    
    // Instantly rip it out of the recent stack when deleted
    setRecent(prevStack => prevStack.filter(d => d.id !== doc.id)); 
  };

  const restoreFromTrash = (doc: any) => {
    const cat = doc.category || 'Public';
    const restoredDoc = { ...doc, status: 'SAFE', deletedAt: undefined };
    
    setDocs(prev => ({
      ...prev,
      Trash: prev.Trash.filter(d => d.id !== doc.id), 
      [cat as keyof typeof prev]: [restoredDoc, ...prev[cat as keyof typeof prev]] 
    }));
    
    // When you restore something, it makes sense to bump it to the top of your recent stack!
    markAsRecent(restoredDoc);
  };

  const deletePermanently = (id: string | number) => {
    setDocs(prev => ({ 
      ...prev, 
      Trash: prev.Trash.filter(d => d.id !== id) 
    }));
  };

  return (
    <DocumentContext.Provider value={{ 
      docs, 
      stats: dynamicStats, 
      recent, 
      deleteToTrash, 
      restoreFromTrash, 
      deletePermanently,
      markAsRecent // Exporting this so UI can trigger it
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

// ─── Custom Hooks ───────────────────────────────────────────────────────────
export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) throw new Error('useDocuments must be used within a DocumentProvider');
  return context;
};

export const useStats = () => { 
  const { stats } = useDocuments(); 
  return { stats, loading: false }; 
};

export const useRecentDocuments = () => { 
  const { recent } = useDocuments(); 
  return { recent, loading: false }; 
};