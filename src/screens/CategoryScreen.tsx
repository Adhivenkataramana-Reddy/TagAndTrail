import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, TouchableOpacity, StatusBar,
  ListRenderItem,
} from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import {
  SearchBar, SegmentTabs, SectionHeader,
  LoadingState, EmptyState, TopBar,
} from '../components/UI';
import { LinkItem, PDFItem } from '../components/DocItems';
import { useDocuments } from '../hooks/useDocuments';
import { Document, CategoryType } from '../types';

// ─── Category config ──────────────────────────────────────────────────────────
interface CatConfig { icon: string; color: string; bg: string; iconBg: string }

const CONFIG: Record<string, CatConfig> = {
  Private:    { icon:'🔒', color:COLORS.blue,   bg:COLORS.bluePale,   iconBg:'#DBEAFE' },
  Public:     { icon:'🌐', color:COLORS.green,  bg:COLORS.greenPale,  iconBg:'#DCFCE7' },
  Restricted: { icon:'⚠️', color:COLORS.orange, bg:COLORS.orangePale, iconBg:'#FED7AA' },
  Trash:      { icon:'🗑️', color:COLORS.purple, bg:COLORS.purplePale, iconBg:'#EDE9FE' },
};

const TABS = ['All', 'Links', 'PDFs'] as const;
type Tab = typeof TABS[number];

// ─── List row types ───────────────────────────────────────────────────────────
type ListRow =
  | { kind: 'header'; id: string; title: string; count: number; dot: string }
  | { kind: 'link';   id: string; item: Document }
  | { kind: 'pdf';    id: string; item: Document };

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  navigation: any;
  category: 'Private' | 'Public' | 'Restricted' | 'Trash';
}

// ─── Screen ───────────────────────────────────────────────────────────────────
const CategoryScreen: React.FC<Props> = ({ navigation, category }) => {
  const cfg = CONFIG[category] ?? CONFIG.Private;
  const [tab, setTab]       = useState<Tab>('All');
  const [search, setSearch] = useState('');

  const apiCat  = category.toLowerCase() as CategoryType;
  const apiType = tab === 'Links' ? 'url' : tab === 'PDFs' ? 'pdf' : undefined;

  const { documents, loading, refetch } = useDocuments(apiCat, apiType, search);

  const links = documents.filter(d => d.type === 'url');
  const pdfs  = documents.filter(d => d.type === 'pdf');

  // Build flat list with header rows
  const buildData = (): ListRow[] => {
    const rows: ListRow[] = [];
    const add = (items: Document[], title: string, dot: string) => {
      if (!items.length) return;
      rows.push({ kind:'header', id:`h-${title}`, title, count:items.length, dot });
      items.forEach(item => rows.push({ kind: item.type === 'pdf' ? 'pdf' : 'link', id: item.id, item }));
    };
    if (tab !== 'PDFs')  add(links, 'Links', COLORS.blue);
    if (tab !== 'Links') add(pdfs,  'PDFs',  COLORS.red);
    return rows;
  };

  const data = buildData();

  const renderItem: ListRenderItem<ListRow> = ({ item: row }) => {
    if (row.kind === 'header') {
      return <SectionHeader title={row.title} count={row.count} dotColor={row.dot} />;
    }
    if (row.kind === 'link') return <LinkItem item={row.item} onPress={() => {}} />;
    if (row.kind === 'pdf')  return <PDFItem  item={row.item} onPress={() => {}} />;
    return null;
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <TopBar title={category} onMenuPress={() => navigation.openDrawer()} />

      {/* Hero banner */}
      <View style={[s.hero, { backgroundColor: cfg.bg }]}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={() => navigation.navigate('Dashboard')}
          hitSlop={{ top:8, bottom:8, left:8, right:8 }}
        >
          <Text style={[s.backText, { color: cfg.color }]}>← Dashboard</Text>
        </TouchableOpacity>
        <View style={s.heroRow}>
          <View style={[s.heroIconWrap, { backgroundColor: cfg.iconBg }]}>
            <Text style={{ fontSize: 22 }}>{cfg.icon}</Text>
          </View>
          <View>
            <Text style={s.heroTitle}>{category}</Text>
            <Text style={s.heroSub}>
              {documents.length} docs · {links.length} links · {pdfs.length} PDFs
            </Text>
          </View>
        </View>
      </View>

      {/* White body */}
      <View style={s.body}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={`Search ${category.toLowerCase()} docs…`}
        />
        <SegmentTabs
          tabs={[...TABS]}
          active={tab}
          onChange={t => setTab(t as Tab)}
        />

        {loading ? (
          <LoadingState />
        ) : data.length === 0 ? (
          <EmptyState
            message={`No ${tab === 'All' ? '' : tab.toLowerCase() + ' '}documents in ${category}`}
          />
        ) : (
          <FlatList<ListRow>
            data={data}
            renderItem={renderItem}
            keyExtractor={row => row.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.listContent}
            onRefresh={refetch}
            refreshing={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor:COLORS.navy },
  hero:        { paddingHorizontal:18, paddingTop:14, paddingBottom:18 },
  backBtn:     { marginBottom:10 },
  backText:    { fontSize:12, fontWeight:FONTS.medium },
  heroRow:     { flexDirection:'row', alignItems:'center', gap:12 },
  heroIconWrap:{ width:46, height:46, borderRadius:RADIUS.lg, alignItems:'center', justifyContent:'center' },
  heroTitle:   { fontSize:22, fontWeight:FONTS.bold, color:COLORS.textPrimary },
  heroSub:     { fontSize:11, color:COLORS.textSecondary, marginTop:2 },
  body:        { flex:1, backgroundColor:COLORS.background },
  listContent: { paddingBottom:36, paddingTop:4 },
});
