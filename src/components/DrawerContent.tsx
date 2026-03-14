import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Platform,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { COLORS, FONTS, RADIUS } from '../constants/theme';

const MAIN_MENU = [
  { key:'Dashboard', label:'Home',     icon:'🏠' },
  { key:'Stats',     label:'Stats',    icon:'📊' },
  { key:'Logs',      label:'Logs',     icon:'📋' },
  { key:'Settings',  label:'Settings', icon:'⚙️' },
];

const CATEGORIES = [
  { key:'Private',    icon:'🔒' },
  { key:'Public',     icon:'🌐' },
  { key:'Restricted', icon:'⚠️' },
  { key:'Trash',      icon:'🗑️' },
];

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation, state }) => {
  const activeRoute = state.routeNames[state.index];

  const go = (screen: string) => {
    navigation.closeDrawer();
    navigation.navigate(screen as never);
  };

  const Item = ({ itemKey, label, icon }: { itemKey:string; label:string; icon:string }) => {
    const active = activeRoute === itemKey;
    return (
      <TouchableOpacity
        style={[s.item, active && s.itemActive]}
        onPress={() => go(itemKey)}
        activeOpacity={0.7}
      >
        <View style={[s.iconWrap, active && s.iconWrapActive]}>
          <Text style={s.itemIcon}>{icon}</Text>
        </View>
        <Text style={[s.itemLabel, active && s.itemLabelActive]}>{label}</Text>
        {active && <View style={s.activeBar} />}
      </TouchableOpacity>
    );
  };

  return (
    // Use plain View so we control exactly where content starts
    <View style={s.container}>

      {/* ── App brand header (no user name / avatar / logout) ── */}
      <View style={s.header}>
        {/* Logo grid */}
        <View style={s.logoGrid}>
          <View style={[s.logoTile, { backgroundColor: COLORS.orange }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(249,115,22,0.55)' }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(249,115,22,0.55)' }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(249,115,22,0.25)' }]} />
        </View>
        <Text style={s.brandName}>
          TagAnd<Text style={{ color: COLORS.orange }}>Trail</Text>
        </Text>
        <Text style={s.brandSub}>AI Document Intelligence</Text>
        <View style={s.accentBar} />
      </View>

      <View style={s.divider} />

      {/* ── Menu ── */}
      <ScrollView style={s.menu} showsVerticalScrollIndicator={false}>
        {MAIN_MENU.map(m => (
          <Item key={m.key} itemKey={m.key} label={m.label} icon={m.icon} />
        ))}

        <View style={[s.divider, { marginVertical: 8 }]} />
        <Text style={s.groupLabel}>Categories</Text>

        {CATEGORIES.map(c => (
          <Item key={c.key} itemKey={c.key} label={c.key} icon={c.icon} />
        ))}
      </ScrollView>

      {/* ── App version footer (no logout) ── */}
      <View style={s.footer}>
        <View style={s.divider} />
        <Text style={s.footerText}>TagAndTrail v1.0.0 · SDK 54</Text>
      </View>
    </View>
  );
};

export default DrawerContent;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // Push content down so it never sits behind the status bar notch
    paddingTop: Platform.OS === 'android' ? 40 : 54,
  },

  // Header — brand only, no user info
  header: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 20,
  },
  logoGrid: {
    width: 44,
    height: 44,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  logoTile:  { width: 19, height: 19, borderRadius: 5 },
  brandName: { fontSize: 20, fontWeight: FONTS.bold, color: COLORS.textPrimary, letterSpacing: -0.3 },
  brandSub:  { fontSize: 11, color: COLORS.textSecondary, marginTop: 3 },
  accentBar: { width: 28, height: 3, backgroundColor: COLORS.orange, borderRadius: RADIUS.full, marginTop: 10 },

  divider:    { height: 1, backgroundColor: COLORS.border },

  // Menu
  menu:       { flex: 1, paddingTop: 8, paddingHorizontal: 12 },
  groupLabel: { fontSize: 10, fontWeight: FONTS.semibold, color: COLORS.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, marginLeft: 12, marginBottom: 4 },

  item:           { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 12, borderRadius: RADIUS.lg, marginBottom: 2, position: 'relative' },
  itemActive:     { backgroundColor: COLORS.orangePale },
  iconWrap:       { width: 36, height: 36, borderRadius: RADIUS.md, backgroundColor: COLORS.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconWrapActive: { backgroundColor: COLORS.orangeLight },
  itemIcon:       { fontSize: 16 },
  itemLabel:      { fontSize: 14, fontWeight: FONTS.medium, color: COLORS.textSecondary, flex: 1 },
  itemLabelActive:{ color: COLORS.orange, fontWeight: FONTS.semibold },
  activeBar:      { width: 3, height: 22, backgroundColor: COLORS.orange, borderRadius: RADIUS.full, position: 'absolute', right: 0 },

  // Footer — version only
  footer:      { paddingBottom: 24 },
  footerText:  { textAlign: 'center', fontSize: 11, color: COLORS.textTertiary, paddingVertical: 14 },
});
