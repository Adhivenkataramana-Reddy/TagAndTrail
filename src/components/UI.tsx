import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, TextInput, ViewStyle, Platform,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants/theme';
import { SafetyStatus } from '../types';

// ─── SafeBadge ────────────────────────────────────────────────────────────────
export const SafeBadge: React.FC<{ status?: SafetyStatus | string }> = ({ status }) => {
  const isSafe = status === 'SAFE' || status === 'safe';
  return (
    <View style={[s.badge, isSafe ? s.badgeSafe : s.badgeWarn]}>
      <Text style={[s.badgeText, isSafe ? s.badgeTextSafe : s.badgeTextWarn]}>
        {isSafe ? 'SAFE' : 'FLAG'}
      </Text>
    </View>
  );
};

// ─── TagPill ──────────────────────────────────────────────────────────────────
type TagVariant = 'orange' | 'blue' | 'green' | 'gray';

export const TagPill: React.FC<{ label: string; variant?: TagVariant }> = ({ label, variant = 'orange' }) => {
  const map: Record<TagVariant, { bg: string; text: string }> = {
    orange: { bg: COLORS.orangePale,         text: COLORS.orange },
    blue:   { bg: COLORS.bluePale,           text: COLORS.blue },
    green:  { bg: COLORS.greenPale,          text: COLORS.green },
    gray:   { bg: COLORS.backgroundTertiary, text: COLORS.textSecondary },
  };
  const v = map[variant];
  return (
    <View style={[s.tagPill, { backgroundColor: v.bg }]}>
      <Text style={[s.tagText, { color: v.text }]}>{label}</Text>
    </View>
  );
};

// ─── SectionHeader ────────────────────────────────────────────────────────────
export const SectionHeader: React.FC<{
  title: string; count?: number; dotColor?: string;
  action?: string; onAction?: () => void;
}> = ({ title, count, dotColor, action, onAction }) => (
  <View style={s.sectionHeader}>
    <View style={s.sectionLeft}>
      {dotColor && <View style={[s.sectionDot, { backgroundColor: dotColor }]} />}
      <Text style={s.sectionTitle}>{title}</Text>
      {count !== undefined && <Text style={s.sectionCount}>{count}</Text>}
    </View>
    {action && (
      <TouchableOpacity onPress={onAction}>
        <Text style={s.sectionAction}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── SearchBar ────────────────────────────────────────────────────────────────
export const SearchBar: React.FC<{
  value: string; onChangeText: (t: string) => void; placeholder?: string;
}> = ({ value, onChangeText, placeholder = 'Search documents…' }) => (
  <View style={s.searchWrap}>
    <View style={s.searchBox}>
      <Text style={s.searchIconText}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        style={s.searchInput}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  </View>
);

// ─── SegmentTabs ──────────────────────────────────────────────────────────────
export const SegmentTabs: React.FC<{
  tabs: string[]; active: string; onChange: (t: string) => void;
}> = ({ tabs, active, onChange }) => (
  <View style={s.segWrap}>
    {tabs.map(tab => (
      <TouchableOpacity
        key={tab}
        style={[s.segTab, active === tab && s.segTabActive]}
        onPress={() => onChange(tab)}
        activeOpacity={0.8}
      >
        <Text style={[s.segLabel, active === tab && s.segLabelActive]}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ─── TopBar ───────────────────────────────────────────────────────────────────
// FIX: paddingTop accounts for status bar so the hamburger is NEVER hidden
// behind the notch. Large hitSlop + min 44px touch target ensures it's tappable.
export const TopBar: React.FC<{
  title: string;
  onMenuPress: () => void;
  onSearchPress?: () => void;
  style?: ViewStyle;
}> = ({ title, onMenuPress, onSearchPress, style }) => (
  <View style={[s.topBar, style]}>
    {/* Hamburger — large touch target */}
    <TouchableOpacity
      onPress={onMenuPress}
      style={s.hamBtn}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
      activeOpacity={0.6}
    >
      <View style={s.hamLine} />
      <View style={[s.hamLine, { width: 14 }]} />
      <View style={[s.hamLine, { width: 18 }]} />
    </TouchableOpacity>

    <Text style={s.topTitle}>{title}</Text>

    <TouchableOpacity
      style={s.iconBtn}
      onPress={onSearchPress}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
    >
      <Text style={{ fontSize: 16 }}>🔍</Text>
    </TouchableOpacity>
  </View>
);

// ─── LoadingState ─────────────────────────────────────────────────────────────
export const LoadingState: React.FC = () => (
  <View style={s.centeredState}>
    <ActivityIndicator color={COLORS.orange} size="large" />
  </View>
);

// ─── EmptyState ───────────────────────────────────────────────────────────────
export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No documents found' }) => (
  <View style={s.centeredState}>
    <Text style={s.emptyIcon}>📭</Text>
    <Text style={s.emptyText}>{message}</Text>
  </View>
);

// ─── PDFIcon ──────────────────────────────────────────────────────────────────
export const PDFIcon: React.FC = () => (
  <View style={s.pdfIcon}><Text style={s.pdfIconText}>PDF</Text></View>
);

// ─── LinkIcon ─────────────────────────────────────────────────────────────────
export const LinkIcon: React.FC = () => (
  <View style={s.linkIcon}><Text style={{ fontSize: 16 }}>🔗</Text></View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Badge
  badge:          { paddingHorizontal:8, paddingVertical:3, borderRadius:RADIUS.sm },
  badgeSafe:      { backgroundColor: COLORS.greenPale },
  badgeWarn:      { backgroundColor: COLORS.yellowPale },
  badgeText:      { fontSize:9, fontWeight:FONTS.bold, letterSpacing:0.5 },
  badgeTextSafe:  { color:'#166534' },
  badgeTextWarn:  { color:'#92400E' },

  // Tag
  tagPill:        { paddingHorizontal:8, paddingVertical:3, borderRadius:RADIUS.full, marginRight:4, marginTop:4 },
  tagText:        { fontSize:10, fontWeight:FONTS.medium },

  // Section header
  sectionHeader:  { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:16, paddingTop:18, paddingBottom:8 },
  sectionLeft:    { flexDirection:'row', alignItems:'center', gap:6 },
  sectionDot:     { width:8, height:8, borderRadius:2 },
  sectionTitle:   { fontSize:14, fontWeight:FONTS.semibold, color:COLORS.textPrimary },
  sectionCount:   { fontSize:11, color:COLORS.textTertiary, marginLeft:2 },
  sectionAction:  { fontSize:12, color:COLORS.orange, fontWeight:FONTS.medium },

  // Search
  searchWrap:     { paddingHorizontal:16, paddingVertical:10 },
  searchBox:      { flexDirection:'row', alignItems:'center', backgroundColor:COLORS.backgroundSecondary, borderRadius:RADIUS.lg, paddingHorizontal:14, paddingVertical:10, borderWidth:1, borderColor:COLORS.border, gap:8 },
  searchIconText: { fontSize:14 },
  searchInput:    { flex:1, fontSize:13, color:COLORS.textPrimary, padding:0 },

  // Segment tabs
  segWrap:        { flexDirection:'row', marginHorizontal:16, marginTop:4, marginBottom:2, backgroundColor:COLORS.backgroundSecondary, borderRadius:RADIUS.lg, padding:3 },
  segTab:         { flex:1, paddingVertical:8, alignItems:'center', borderRadius:RADIUS.md },
  segTabActive:   { backgroundColor:COLORS.orange, ...SHADOW.sm },
  segLabel:       { fontSize:12, fontWeight:FONTS.medium, color:COLORS.textSecondary },
  segLabelActive: { color:COLORS.textInverse, fontWeight:FONTS.semibold },

  // TopBar — paddingTop pushes it below the status bar so hamburger is always touchable
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.navy,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 48 : 54,
    paddingBottom: 14,
  },
  // Hamburger — min 44×44 touch target, extra padding inside
  hamBtn:  {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  hamLine: { width: 20, height: 2.5, backgroundColor: '#FFFFFF', borderRadius: 2 },
  topTitle:{ fontSize:17, fontWeight:FONTS.semibold, color:'#FFFFFF' },
  iconBtn: { width:44, height:44, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:RADIUS.full, alignItems:'center', justifyContent:'center' },

  // States
  centeredState:  { paddingVertical:60, alignItems:'center', justifyContent:'center' },
  emptyIcon:      { fontSize:36, marginBottom:12 },
  emptyText:      { fontSize:14, color:COLORS.textTertiary },

  // Icons
  pdfIcon:        { width:38, height:44, backgroundColor:COLORS.redPale, borderRadius:RADIUS.sm, alignItems:'center', justifyContent:'center' },
  pdfIconText:    { fontSize:9, fontWeight:FONTS.bold, color:COLORS.red },
  linkIcon:       { width:36, height:36, backgroundColor:COLORS.bluePale, borderRadius:RADIUS.md, alignItems:'center', justifyContent:'center' },
});
