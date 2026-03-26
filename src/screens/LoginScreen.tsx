import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, StatusBar 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// ─── DUMMY CREDENTIALS ─────────────────────────────────────────
const DUMMY_PHONE = "1234567890";
const DUMMY_PASS = "admin123";

const LoginScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // clear previous errors
    
    // Check against dummy credentials
    if (phone === DUMMY_PHONE && password === DUMMY_PASS) {
      // Use replace so they can't hit the "back" button to return to login!
      navigation.replace('Splash'); 
    } else {
      setError('Invalid phone number or password.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[s.container, { paddingTop: insets.top }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={s.content}>
        {/* Brand Header */}
        <View style={s.brandWrap}>
          <View style={s.iconBox}>
            <Feather name="shield" size={40} color="#2D464C" />
          </View>
          <Text style={s.brandName}>
            TagAnd<Text style={{ color: '#F5D1B0' }}>Trail</Text>
          </Text>
          <Text style={s.subhead}>Secure Intelligence Workspace</Text>
        </View>

        {/* Form Container */}
        <View style={s.form}>
          {error ? <Text style={s.errorTxt}>{error}</Text> : null}

          {/* Phone Input */}
          <View style={s.inputWrap}>
            <Feather name="phone" size={20} color="rgba(255,255,255,0.4)" />
            <TextInput 
              style={s.input}
              placeholder="Phone Number"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(txt) => { setPhone(txt); setError(''); }}
            />
          </View>

          {/* Password Input */}
          <View style={s.inputWrap}>
            <Feather name="lock" size={20} color="rgba(255,255,255,0.4)" />
            <TextInput 
              style={s.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.4)"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={(txt) => { setPassword(txt); setError(''); }}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ padding: 4 }}>
              <Feather name={showPass ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={s.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={s.loginBtnTxt}>Access Workspace</Text>
            <Feather name="arrow-right" size={20} color="#2D464C" />
          </TouchableOpacity>
          
          <Text style={s.hint}>Demo: Phone: {DUMMY_PHONE} | Pass: {DUMMY_PASS}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D464C' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  brandWrap: { alignItems: 'center', marginBottom: 50 },
  iconBox: { width: 80, height: 80, backgroundColor: '#F5D1B0', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  brandName: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 },
  subhead: { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '600', marginTop: 8 },
  form: { width: '100%' },
  errorTxt: { color: '#FF8484', textAlign: 'center', marginBottom: 15, fontWeight: '700' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, height: 60, paddingHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  input: { flex: 1, marginLeft: 15, color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  loginBtn: { flexDirection: 'row', backgroundColor: '#F5D1B0', height: 60, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 },
  loginBtnTxt: { color: '#2D464C', fontSize: 18, fontWeight: '800' },
  hint: { textAlign: 'center', color: 'rgba(255,255,255,0.3)', marginTop: 25, fontSize: 12, fontWeight: '600' }
});