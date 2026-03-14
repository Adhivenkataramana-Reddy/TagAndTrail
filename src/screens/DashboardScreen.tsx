import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants/theme';
import { TopBar, SectionHeader, LoadingState, EmptyState } from '../components/UI';
import { RecentDocItem } from '../components/DocItems';
import { useStats, useRecentDocuments } from '../hooks/useDocuments';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ icon:string; value:number|string; label:string; iconBg:string }> = ({ icon, value, label, iconBg }) => (
  <View style={[s.statCard, SHADOW.sm]}>
    <View style={[s.statIcon, { backgroundColor: iconBg }]}>
      <Text style={{ fontSize:18 }}>{icon}</Text>
    </View>
    <Text style={s.statVal}>{value}</Text>
    <Text style={s.statLbl}>{label}</Text>
  </View>
);

// ─── Category Card ────────────────────────────────────────────────────────────
const CatCard: React.FC<{
  label:string; count:number; icon:string;
  bg:string; iconBg:string; textColor:string; onPress:()=>void
}> = ({ label, count, icon, bg, iconBg, textColor, onPress }) => (
  <TouchableOpacity
    style={[s.catCard, { backgroundColor: bg }, SHADOW.sm]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[s.catIcon, { backgroundColor: iconBg }]}>
      <Text style={{ fontSize:20 }}>{icon}</Text>
    </View>
    <Text style={[s.catName, { color: textColor }]}>{label}</Text>
    <Text style={s.catCount}>{count} docs</Text>
    <View style={[s.catArrow, { backgroundColor: iconBg }]}>
      <Text style={{ color: textColor, fontSize:13, fontWeight: FONTS.semibold }}>›</Text>
    </View>
  </TouchableOpacity>
);

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { stats }               = useStats();
  const { recent, loading }     = useRecentDocuments();

  const cats = [
    { label:'Private',    icon:'🔒', bg:COLORS.bluePale,   iconBg:'#DBEAFE', textColor:'#1D4ED8', count:stats.private_count    ?? 34, screen:'Private'    },
    { label:'Public',     icon:'🌐', bg:COLORS.greenPale,  iconBg:'#DCFCE7', textColor:'#15803D', count:stats.public_count     ?? 56, screen:'Public'     },
    { label:'Restricted', icon:'⚠️', bg:COLORS.orangePale, iconBg:'#FED7AA', textColor:'#C2410C', count:stats.restricted_count ?? 18, screen:'Restricted' },
    { label:'Trash',      icon:'🗑️', bg:COLORS.purplePale, iconBg:'#EDE9FE', textColor:'#6D28D9', count:stats.trash_count      ?? 12, screen:'Trash'      },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <TopBar title="Dashboard" onMenuPress={() => navigation.openDrawer()} />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={s.hero}>
          <Text style={s.heroTitle}>
            TagAnd<Text style={{ color: COLORS.orange }}>Trail</Text>
          </Text>
          <Text style={s.heroSub}>AI Document Intelligence</Text>
          <View style={s.heroAccent} />
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <StatCard icon="📄" value={stats.total_docs  ?? 120} label="Docs"  iconBg={COLORS.orangePale} />
          <StatCard icon="✅" value={stats.safe_docs   ?? 115} label="Safe"  iconBg={COLORS.greenPale}  />
          <StatCard icon="🔗" value={stats.total_links ?? 48}  label="Links" iconBg={COLORS.bluePale}   />
          <StatCard icon="📑" value={stats.total_pdfs  ?? 72}  label="PDFs"  iconBg={COLORS.purplePale} />
        </View>

        {/* Categories */}
        <SectionHeader title="Categories" />
        <View style={s.catGrid}>
          {cats.map(c => (
            <CatCard
              key={c.label}
              {...c}
              onPress={() => navigation.navigate(c.screen)}
            />
          ))}
        </View>

        {/* Recent Documents */}
        <SectionHeader title="Recent Documents" action="View all" onAction={() => {}} />
        <View style={s.recentList}>
          {loading
            ? <LoadingState />
            : recent.length === 0
              ? <EmptyState message="No recent documents" />
              : recent.map(doc => <RecentDocItem key={doc.id} item={doc} />)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const s = StyleSheet.create({
  safe:       { flex:1, backgroundColor: COLORS.navy },
  scroll:     { flex:1, backgroundColor: COLORS.background },
  content:    { paddingBottom: 36 },

  hero:        { paddingHorizontal:18, paddingTop:22, paddingBottom:18 },
  heroTitle:   { fontSize:28, fontWeight:FONTS.bold, color:COLORS.textPrimary, letterSpacing:-0.5 },
  heroSub:     { fontSize:13, color:COLORS.textSecondary, marginTop:4 },
  heroAccent:  { width:36, height:3, backgroundColor:COLORS.orange, borderRadius:RADIUS.full, marginTop:12 },

  statsRow:   { flexDirection:'row', gap:8, paddingHorizontal:16, marginBottom:4 },
  statCard:   { flex:1, backgroundColor:COLORS.card, borderRadius:RADIUS.lg, padding:12, alignItems:'center', borderWidth:1, borderColor:COLORS.cardBorder },
  statIcon:   { width:34, height:34, borderRadius:RADIUS.md, alignItems:'center', justifyContent:'center', marginBottom:6 },
  statVal:    { fontSize:20, fontWeight:FONTS.bold, color:COLORS.textPrimary },
  statLbl:    { fontSize:9, color:COLORS.textSecondary, marginTop:1, textAlign:'center' },

  catGrid:    { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:12, gap:8 },
  catCard:    { width:'47%', borderRadius:RADIUS.xl, padding:18, position:'relative', overflow:'hidden' },
  catIcon:    { width:44, height:44, borderRadius:RADIUS.md, alignItems:'center', justifyContent:'center', marginBottom:10 },
  catName:    { fontSize:15, fontWeight:FONTS.semibold },
  catCount:   { fontSize:11, color:COLORS.textSecondary, marginTop:2 },
  catArrow:   { position:'absolute', bottom:14, right:14, width:26, height:26, borderRadius:RADIUS.full, alignItems:'center', justifyContent:'center' },

  recentList: { paddingHorizontal:16 },
});
