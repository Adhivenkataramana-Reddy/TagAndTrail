import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants/theme';
import { Document } from '../types';
import { SafeBadge, TagPill, PDFIcon, LinkIcon } from './UI';

const fmt = (d: string) => {
  try {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (diff < 60)        return 'Just now';
    if (diff < 3600)      return `${Math.floor(diff/60)} min ago`;
    if (diff < 86400)     return `${Math.floor(diff/3600)} hr ago`;
    return `${Math.floor(diff/86400)} days ago`;
  } catch { return d; }
};

interface P { item: Document; onPress?: (item: Document) => void }

export const LinkItem: React.FC<P> = ({ item, onPress }) => {
  const display = item.tags.slice(0, 3);
  const extra   = item.tags.length - 3;
  return (
    <TouchableOpacity style={s.card} onPress={() => onPress?.(item)} activeOpacity={0.8}>
      <View style={s.row}>
        <LinkIcon />
        <View style={s.body}>
          <Text style={s.title} numberOfLines={1}>{item.name}</Text>
          <Text style={s.url}   numberOfLines={1}>{item.url}</Text>
        </View>
        <View style={s.scoreCol}>
          <Text style={s.score}>{item.score != null ? `${Math.round(item.score)}%` : '—'}</Text>
          <Text style={s.scoreLbl}>match</Text>
        </View>
      </View>
      <View style={s.tagsRow}>
        {display.map((t, i) => <TagPill key={i} label={t} variant="orange" />)}
        {extra > 0 && <View style={s.extra}><Text style={s.extraTxt}>+{extra}</Text></View>}
        <View style={{ flex:1 }} />
        <SafeBadge status={item.safety} />
      </View>
    </TouchableOpacity>
  );
};

export const PDFItem: React.FC<P> = ({ item, onPress }) => {
  const display = item.tags.slice(0, 3);
  const extra   = item.tags.length - 3;
  return (
    <TouchableOpacity style={s.card} onPress={() => onPress?.(item)} activeOpacity={0.8}>
      <View style={s.row}>
        <PDFIcon />
        <View style={s.body}>
          <Text style={s.title}    numberOfLines={1}>{item.name}</Text>
          <Text style={s.subtitle} numberOfLines={1}>{item.description ?? 'PDF Document'}</Text>
          <Text style={s.meta}>{[item.size, fmt(item.created_at)].filter(Boolean).join(' · ')}</Text>
        </View>
        <SafeBadge status={item.safety} />
      </View>
      <View style={s.tagsRow}>
        {display.map((t, i) => <TagPill key={i} label={t} variant="orange" />)}
        {extra > 0 && <View style={s.extra}><Text style={s.extraTxt}>+{extra}</Text></View>}
      </View>
    </TouchableOpacity>
  );
};

export const RecentDocItem: React.FC<P> = ({ item, onPress }) => (
  <TouchableOpacity style={s.recentCard} onPress={() => onPress?.(item)} activeOpacity={0.8}>
    <View style={s.row}>
      {item.type === 'pdf' ? <PDFIcon /> : <LinkIcon />}
      <View style={s.body}>
        <Text style={s.title} numberOfLines={1}>{item.name}</Text>
        <Text style={s.meta}>{item.type.toUpperCase()} · {fmt(item.created_at)}</Text>
      </View>
      <SafeBadge status={item.safety} />
    </View>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  card:       { backgroundColor:COLORS.card, borderRadius:RADIUS.lg, padding:13, marginHorizontal:16, marginBottom:8, borderWidth:1, borderColor:COLORS.cardBorder, ...SHADOW.sm },
  recentCard: { backgroundColor:COLORS.card, borderRadius:RADIUS.lg, padding:12, marginBottom:8, borderWidth:1, borderColor:COLORS.cardBorder, ...SHADOW.sm },
  row:        { flexDirection:'row', alignItems:'flex-start', gap:10 },
  body:       { flex:1, gap:2 },
  title:      { fontSize:13, fontWeight:FONTS.semibold, color:COLORS.textPrimary },
  url:        { fontSize:11, color:COLORS.orange, marginTop:1 },
  subtitle:   { fontSize:11, color:COLORS.textSecondary, marginTop:1 },
  meta:       { fontSize:10, color:COLORS.textTertiary, marginTop:1 },
  scoreCol:   { alignItems:'center', minWidth:36 },
  score:      { fontSize:14, fontWeight:FONTS.bold, color:COLORS.blue },
  scoreLbl:   { fontSize:9, color:COLORS.textTertiary },
  tagsRow:    { flexDirection:'row', flexWrap:'wrap', marginTop:8, alignItems:'center' },
  extra:      { paddingHorizontal:7, paddingVertical:3, backgroundColor:COLORS.backgroundTertiary, borderRadius:RADIUS.full, marginTop:4, marginRight:4 },
  extraTxt:   { fontSize:10, color:COLORS.textSecondary, fontWeight:FONTS.medium },
});
