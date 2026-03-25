import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.75)).current;
  const slideY  = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale,   { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
      Animated.timing(slideY,  { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    
    // Auto-navigates to Dashboard after 2.4 seconds
    const t = setTimeout(() => navigation.replace('Main'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.container}>
      {/* ── Bouncing Logo Box ── */}
      <Animated.View style={[s.logoWrap, { opacity, transform: [{ scale }] }]}>
        <View style={s.grid}>
          {/* Matches the Drawer Menu Peach Logo */}
          <View style={[s.tile, { backgroundColor: '#F5D1B0' }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(245, 209, 176, 0.7)' }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(245, 209, 176, 0.7)' }]} />
          <View style={[s.tile, { backgroundColor: 'rgba(245, 209, 176, 0.3)' }]} />
        </View>
      </Animated.View>

      {/* ── Sliding Text ── */}
      <Animated.View style={{ opacity, transform: [{ translateY: slideY }], alignItems: 'center' }}>
        <Text style={s.title}>
          TagAnd<Text style={{ color: '#F5D1B0' }}>Trail</Text>
        </Text>
        <Text style={s.subtitle}>Processing documents with AI</Text>
      </Animated.View>

      {/* ── Progress Bar ── */}
      <Animated.View style={[s.loaderTrack, { opacity }]}>
        <View style={s.loaderFill} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const s = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2D464C', // Forest Green
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 16 
  },
  logoWrap: { 
    width: 96, 
    height: 96, 
    borderRadius: 26, 
    backgroundColor: 'rgba(255,255,255,0.05)', // Subtle frosted glass box
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.08)' 
  },
  grid: { 
    width: 48, 
    height: 48, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 5 
  },
  tile: { 
    width: 21, 
    height: 21, 
    borderRadius: 6 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    letterSpacing: -0.5, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.6)', 
    marginTop: 8, 
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  loaderTrack: { 
    width: 52, 
    height: 4, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 10, 
    marginTop: 28, 
    overflow: 'hidden' 
  },
  loaderFill: { 
    width: '65%', 
    height: '100%', 
    backgroundColor: '#F5D1B0', // Peach loading bar
    borderRadius: 10 
  },
});