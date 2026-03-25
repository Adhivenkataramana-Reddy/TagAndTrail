import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Platform,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
const MAIN_MENU = [
  { key: 'Dashboard', label: 'Home',  icon: 'home' },
  { key: 'Stats',     label: 'Stats', icon: 'bar-chart-2' },
  { key: 'Logs',      label: 'Logs',  icon: 'file-text' },
  { key: 'Trash',     label: 'Trash', icon: 'trash-2' }, // <-- Added Trash here!
];

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation, state }) => {
  const activeRoute = state.routeNames[state.index];

  const go = (screen: string) => {
    navigation.closeDrawer();
    navigation.navigate(screen as never);
  };

  const Item = ({ itemKey, label, icon }: { itemKey: string; label: string; icon: any }) => {
    const active = activeRoute === itemKey;
    return (
      <TouchableOpacity
        style={[s.item, active && s.itemActive]}
        onPress={() => go(itemKey)}
        activeOpacity={0.7}
      >
        <View style={[s.iconWrap, active && s.iconWrapActive]}>
          <Feather 
            name={icon} 
            size={20} 
            color={active ? '#F5D1B0' : 'rgba(255,255,255,0.5)'} 
          />
        </View>
        <Text style={[s.itemLabel, active && s.itemLabelActive]}>{label}</Text>
        {active && <View style={s.activeBar} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.container}>

      {/* ── App brand header ── */}
      <View style={s.header}>
        {/* Themed Logo Grid */}
        <View style={s.logoGrid}>
          <View style={[s.logoTile, { backgroundColor: '#F5D1B0' }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(245, 209, 176, 0.7)' }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(245, 209, 176, 0.7)' }]} />
          <View style={[s.logoTile, { backgroundColor: 'rgba(245, 209, 176, 0.3)' }]} />
        </View>
        <Text style={s.brandName}>
          TagAnd<Text style={{ color: '#F5D1B0' }}>Trail</Text>
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
      </ScrollView>

      {/* ── App version footer ── */}
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
    backgroundColor: '#2D464C', // Forest Green background
    paddingTop: Platform.OS === 'android' ? 40 : 54,
  },

  // Header
  header: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 25,
  },
  logoGrid: {
    width: 44,
    height: 44,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 16,
  },
  logoTile:  { width: 19, height: 19, borderRadius: 6 },
  brandName: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  brandSub:  { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: '600' },
  accentBar: { width: 32, height: 4, backgroundColor: '#F5D1B0', borderRadius: 2, marginTop: 12 },

  divider:    { height: 1, backgroundColor: 'rgba(255,255,255,0.06)' },

  // Menu
  menu:       { flex: 1, paddingTop: 16, paddingHorizontal: 16 },

  item:           { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, marginBottom: 6, position: 'relative' },
  itemActive:     { backgroundColor: 'rgba(245, 209, 176, 0.1)' }, // Soft peach highlight
  iconWrap:       { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  iconWrapActive: { backgroundColor: 'transparent' },
  itemLabel:      { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.7)', flex: 1 },
  itemLabelActive:{ color: '#F5D1B0', fontWeight: '800' },
  activeBar:      { width: 4, height: 24, backgroundColor: '#F5D1B0', borderRadius: 2, position: 'absolute', right: 0 },

  // Footer
  footer:      { paddingBottom: 24 },
  footerText:  { textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', paddingVertical: 16, fontWeight: '600', letterSpacing: 0.5 },
});