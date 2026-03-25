import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinkItem, PDFItem } from '../components/DocItems'; // <-- 1. Added this import

// Dummy data matching your screenshot
const DUMMY_DOCS = [
  { id: '1', type: 'link', title: 'LLM Survey 2024', sub: 'https://hai.stanford.edu/news', tags: ['LLM', 'survey', '2024', '+1'], match: '91%', status: 'SAFE' },
  { id: '2', type: 'link', title: 'OpenAI GPT-4 Report', sub: 'https://openai.com/research/gpt-4', tags: ['GPT-4', 'openai', 'LLM'], match: '96%', status: 'SAFE' },
  { id: '3', type: 'pdf', title: 'Supply_Chain_Report.pdf', sub: 'Global logistics 2024 • 3.2 MB', tags: ['logistics', 'supply chain', 'ops'], match: '96%', status: 'SAFE' },
];

// Changed to CategoryScreen and now directly accepting the 'category' prop
const CategoryScreen = ({ navigation, category = 'Public' }) => {
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Dynamic configuration based on the workspace type
  const config = {
    Private: { icon: 'lock', title: 'Private Workspace' },
    Public: { icon: 'globe', title: 'Public Workspace' },
    Restricted: { icon: 'alert-triangle', title: 'Restricted Workspace' },
    Trash: { icon: 'trash-2', title: 'Trash' }
  }[category] || { icon: 'folder', title: `${category} Workspace` };

  // Filter logic
  const filteredDocs = DUMMY_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Links' && doc.type === 'link') || 
                      (activeTab === 'PDFs' && doc.type === 'pdf');
    return matchesSearch && matchesTab;
  });

  const linksCount = filteredDocs.filter(d => d.type === 'link').length;
  const pdfsCount = filteredDocs.filter(d => d.type === 'pdf').length;

  // 2. Removed the old renderDocCard function from here

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      {/* ── Top Bar ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.menuBtn} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* ── Dynamic Title Area ── */}
      <View style={s.titleSection}>
        <View style={s.titleIconWrap}>
          <Feather name={config.icon} size={32} color="#2D464C" />
        </View>
        <View>
          <Text style={s.pageTitle}>{config.title}</Text>
          <Text style={s.pageStats}>{filteredDocs.length} TOTAL · {linksCount} LINKS · {pdfsCount} PDFS</Text>
        </View>
      </View>

      {/* ── Search Bar ── */}
      <View style={s.searchWrapper}>
        <Feather name="search" size={20} color="rgba(255,255,255,0.4)" />
        <TextInput 
          style={s.searchInput}
          placeholder={`Search ${category.toLowerCase()} docs...`}
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ── Tabs ── */}
      <View style={s.tabContainer}>
        {['All', 'Links', 'PDFs'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[s.tab, activeTab === tab && s.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[s.tabText, activeTab === tab && s.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Document List ── */}
      <ScrollView style={s.listContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {(activeTab === 'All' || activeTab === 'Links') && linksCount > 0 && (
          <View>
            <View style={s.sectionTitleRow}>
              <View style={s.dot} />
              <Text style={s.sectionTitleText}>Web Links</Text>
              <Text style={s.sectionCount}>{linksCount}</Text>
            </View>
            {/* 3. Replaced renderDocCard with the new LinkItem */}
            {filteredDocs.filter(d => d.type === 'link').map(doc => <LinkItem key={doc.id} item={doc} />)}
          </View>
        )}

        {(activeTab === 'All' || activeTab === 'PDFs') && pdfsCount > 0 && (
          <View style={{ marginTop: 20 }}>
            <View style={s.sectionTitleRow}>
              <View style={[s.dot, { backgroundColor: '#FF8484' }]} />
              <Text style={s.sectionTitleText}>PDF Files</Text>
              <Text style={s.sectionCount}>{pdfsCount}</Text>
            </View>
            {/* 4. Replaced renderDocCard with the new PDFItem */}
            {filteredDocs.filter(d => d.type === 'pdf').map(doc => <PDFItem key={doc.id} item={doc} />)}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D464C' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  menuBtn: { padding: 4, marginLeft: -4 }, 
  titleSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 24, gap: 16 },
  titleIconWrap: { width: 64, height: 64, backgroundColor: '#FFFFFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  pageStats: { fontSize: 11, fontWeight: '800', color: '#F5D1B0', marginTop: 6, letterSpacing: 1.5, textTransform: 'uppercase' },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', marginHorizontal: 24, borderRadius: 16, paddingHorizontal: 16, height: 56, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 12, color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  tabContainer: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', marginHorizontal: 24, borderRadius: 16, padding: 6, marginBottom: 25 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tabText: { color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: 15 },
  activeTabText: { color: '#2D464C', fontWeight: '800' },
  listContainer: { paddingHorizontal: 24 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80' }, 
  sectionTitleText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.2 },
  sectionCount: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.4)' },
  // 5. Removed unused card styles from here, left everything else untouched
}); 