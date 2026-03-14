import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.75)).current;
  const slideY  = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue:1, duration:700, useNativeDriver:true }),
      Animated.spring(scale,   { toValue:1, tension:55, friction:7, useNativeDriver:true }),
      Animated.timing(slideY,  { toValue:0, duration:600, useNativeDriver:true }),
    ]).start();
    const t = setTimeout(() => navigation.replace('Main'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.container}>
      <Animated.View style={[s.logoWrap, { opacity, transform:[{ scale }] }]}>
        <View style={s.grid}>
          <View style={[s.tile, { backgroundColor: COLORS.orange }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(249,115,22,0.55)' }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(249,115,22,0.55)' }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(249,115,22,0.25)' }]} />
        </View>
      </Animated.View>

      <Animated.View style={{ opacity, transform:[{ translateY: slideY }], alignItems:'center' }}>
        <Text style={s.title}>TagAndTrail</Text>
        <Text style={s.subtitle}>Processing documents with AI</Text>
      </Animated.View>

      <Animated.View style={[s.loaderTrack, { opacity }]}>
        <View style={s.loaderFill} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const s = StyleSheet.create({
  container:   { flex:1, backgroundColor:COLORS.navy, alignItems:'center', justifyContent:'center', gap:16 },
  logoWrap:    { width:96, height:96, borderRadius:26, backgroundColor:COLORS.navy2, alignItems:'center', justifyContent:'center', marginBottom:8, borderWidth:1, borderColor:'rgba(255,255,255,0.08)' },
  grid:        { width:48, height:48, flexDirection:'row', flexWrap:'wrap', gap:5 },
  tile:        { width:21, height:21, borderRadius:6 },
  title:       { fontSize:30, fontWeight:FONTS.bold, color:'#FFFFFF', letterSpacing:-0.5, textAlign:'center' },
  subtitle:    { fontSize:13, color:'rgba(255,255,255,0.45)', marginTop:5, textAlign:'center' },
  loaderTrack: { width:52, height:4, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:RADIUS.full, marginTop:28, overflow:'hidden' },
  loaderFill:  { width:'65%', height:'100%', backgroundColor:COLORS.orange, borderRadius:RADIUS.full },
});
