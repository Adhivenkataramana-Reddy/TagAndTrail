import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants/theme';
import { TopBar } from '../components/UI';
import { fetchLogs } from '../api';
import { LogEntry, LogStatus } from '../types';
import { useStats } from '../hooks/useDocuments';

// ─── Stats Screen ──────────────────────────────────────────────────────────────
export const StatsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { stats } = useStats();

  const rows = [
    { label:'Total Documents', value:stats.total_docs,        icon:'📄', color:COLORS.orange },
    { label:'Safe Documents',  value:stats.safe_docs,         icon:'✅', color:COLORS.green  },
    { label:'Total Links',     value:stats.total_links,       icon:'🔗', color:COLORS.blue   },
    { label:'Total PDFs',      value:stats.total_pdfs,        icon:'📑', color:COLORS.purple },
    { label:'Private',         value:stats.private_count,     icon:'🔒', color:COLORS.blue   },
    { label:'Public',          value:stats.public_count,      icon:'🌐', color:COLORS.green  },
    { label:'Restricted',      value:stats.restricted_count,  icon:'⚠️', color:COLORS.orange },
    { label:'Trash',           value:stats.trash_count,       icon:'🗑️', color:COLORS.purple },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <TopBar title="Stats" onMenuPress={() => navigation.openDrawer()} />
      <ScrollView style={s.body} contentContainerStyle={s.bodyContent} showsVerticalScrollIndicator={false}>
        <Text style={s.pageTitle}>Statistics</Text>
        <View style={s.grid}>
          {rows.map(r => (
            <View key={r.label} style={[s.statCard, SHADOW.sm]}>
              <View style={[s.statIcon, { backgroundColor: r.color + '18' }]}>
                <Text style={{ fontSize:24 }}>{r.icon}</Text>
              </View>
              <Text style={s.statVal}>{r.value ?? '—'}</Text>
              <Text style={s.statLbl}>{r.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Logs Screen ──────────────────────────────────────────────────────────────
const MOCK_LOGS: LogEntry[] = [
  { id:1, message:'AI_Paper.pdf processed successfully',    timestamp:'2024-01-15 09:41', status:'success' },
  { id:2, message:'arxiv.org/abs/2401 URL tagged',          timestamp:'2024-01-15 09:26', status:'success' },
  { id:3, message:'Security_Report.pdf flagged for review', timestamp:'2024-01-15 08:55', status:'warning' },
  { id:4, message:'Supply_Chain_Report.pdf processed',      timestamp:'2024-01-14 17:30', status:'success' },
  { id:5, message:'WhatsApp sandbox connection verified',   timestamp:'2024-01-14 09:00', status:'info'    },
  { id:6, message:'Q3_Finance.pdf processing failed',       timestamp:'2024-01-13 14:12', status:'error'   },
];

const STATUS_COLOR: Record<LogStatus, string> = {
  success: COLORS.green, warning: COLORS.orange, error: COLORS.red, info: COLORS.blue,
};
const STATUS_ICON: Record<LogStatus, string> = {
  success:'✅', warning:'⚠️', error:'❌', info:'ℹ️',
};

export const LogsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [logs, setLogs]       = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs()
      .then(setLogs)
      .catch(() => setLogs(MOCK_LOGS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <TopBar title="Logs" onMenuPress={() => navigation.openDrawer()} />
      <ScrollView style={s.body} contentContainerStyle={s.bodyContent} showsVerticalScrollIndicator={false}>
        <Text style={s.pageTitle}>Processing Logs</Text>
        {loading
          ? <ActivityIndicator color={COLORS.orange} size="large" style={{ marginTop:40 }} />
          : logs.map(log => (
            <View key={log.id} style={[s.logCard, SHADOW.sm]}>
              <View style={[s.logDot, { backgroundColor: STATUS_COLOR[log.status] }]} />
              <View style={s.logBody}>
                <Text style={s.logMsg}>{log.message}</Text>
                <Text style={s.logTime}>{log.timestamp}</Text>
              </View>
              <Text style={{ fontSize:16 }}>{STATUS_ICON[log.status]}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Settings Screen ──────────────────────────────────────────────────────────
//
// WHAT EACH SETTING DOES:
//
// ── Backend ──────────────────────────────────────────────────────────────────
//  • API Base URL      → The address of your FastAPI server. Change this in
//                        src/api/index.ts → BASE_URL. The app sends all
//                        document processing requests to this URL.
//
//  • WhatsApp Number   → The Twilio sandbox number your users send documents
//                        to via WhatsApp. This is configured in your Twilio
//                        dashboard, not in the app itself.
//
//  • Connection Status → Shows whether the last API call succeeded. "Connected"
//                        means the backend responded. "Offline" means the app
//                        is using mock data.
//
// ── Processing ───────────────────────────────────────────────────────────────
//  • Default Category  → When a new document arrives via WhatsApp, if the
//                        backend cannot determine public/private, it falls back
//                        to this category.
//
//  • Safety Check      → Whether the backend runs the safety classifier
//                        (XGBoost / Random Forest) on every document. When
//                        Enabled, documents that fail get the FLAG badge.
//
//  • Tag Language      → The language used for POS tagging, SemBERT scoring,
//                        and tag generation. Changing this affects which
//                        HuggingFace model the backend loads.
//
//  • Max Tags          → The maximum number of tags the MMR algorithm returns
//                        per document. More tags = more coverage, fewer = more
//                        precise.
//
// ── App ──────────────────────────────────────────────────────────────────────
//  • App Version       → Current TagAndTrail version and Expo SDK.
//  • Build             → Internal build number for debugging.
//
// ─────────────────────────────────────────────────────────────────────────────
export const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={s.safe}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
    <TopBar title="Settings" onMenuPress={() => navigation.openDrawer()} />
    <View style={s.body} />
  </SafeAreaView>
);

// ─── Shared styles ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor: COLORS.navy },
  body:        { flex:1, backgroundColor: COLORS.background },
  bodyContent: { padding:16, paddingBottom:44 },
  pageTitle:   { fontSize:24, fontWeight:FONTS.bold, color:COLORS.textPrimary, marginBottom:20 },

  // Stats
  grid:        { flexDirection:'row', flexWrap:'wrap', gap:10 },
  statCard:    { width:'47%', backgroundColor:COLORS.card, borderRadius:RADIUS.xl, padding:18, borderWidth:1, borderColor:COLORS.cardBorder, alignItems:'center' },
  statIcon:    { width:52, height:52, borderRadius:RADIUS.lg, alignItems:'center', justifyContent:'center', marginBottom:10 },
  statVal:     { fontSize:28, fontWeight:FONTS.bold, color:COLORS.textPrimary },
  statLbl:     { fontSize:11, color:COLORS.textSecondary, marginTop:3, textAlign:'center' },

  // Logs
  logCard:     { flexDirection:'row', alignItems:'center', backgroundColor:COLORS.card, borderRadius:RADIUS.lg, padding:14, marginBottom:8, borderWidth:1, borderColor:COLORS.cardBorder, gap:12 },
  logDot:      { width:8, height:8, borderRadius:4, flexShrink:0 },
  logBody:     { flex:1 },
  logMsg:      { fontSize:13, color:COLORS.textPrimary, fontWeight:FONTS.medium },
  logTime:     { fontSize:11, color:COLORS.textTertiary, marginTop:3 },

  // Settings
  settingGroup:    { marginBottom:22 },
  groupLabel:      { fontSize:11, fontWeight:FONTS.semibold, color:COLORS.textTertiary, textTransform:'uppercase', letterSpacing:0.8, marginBottom:3, marginLeft:4 },
  groupDesc:       { fontSize:11, color:COLORS.textTertiary, marginBottom:8, marginLeft:4 },
  groupCard:       { backgroundColor:COLORS.card, borderRadius:RADIUS.xl, borderWidth:1, borderColor:COLORS.cardBorder },
  settingRow:      { flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:14 },
  rowBorder:       { borderBottomWidth:1, borderBottomColor:COLORS.border },
  settingLeft:     { flexDirection:'row', alignItems:'center', gap:12, flex:1, paddingRight:8 },
  settingIconWrap: { width:34, height:34, borderRadius:RADIUS.md, backgroundColor:COLORS.backgroundSecondary, alignItems:'center', justifyContent:'center', flexShrink:0 },
  settingTextCol:  { flex:1 },
  settingLabel:    { fontSize:13, color:COLORS.textPrimary, fontWeight:FONTS.medium },
  settingHint:     { fontSize:10, color:COLORS.textTertiary, marginTop:2, lineHeight:14 },
  settingValue:    { fontSize:12, color:COLORS.orange, fontWeight:FONTS.medium, flexShrink:0, maxWidth:120, textAlign:'right' },

  // Info box
  infoBox:   { backgroundColor:COLORS.bluePale, borderRadius:RADIUS.xl, padding:16, borderWidth:1, borderColor:'#BFDBFE', marginTop:4 },
  infoTitle: { fontSize:13, fontWeight:FONTS.semibold, color:'#1D4ED8', marginBottom:8 },
  infoText:  { fontSize:12, color:'#1E40AF', lineHeight:18 },
});
