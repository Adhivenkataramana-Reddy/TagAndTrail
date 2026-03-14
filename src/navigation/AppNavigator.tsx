import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerContent from '../components/DrawerContent';
import DashboardScreen from '../screens/DashboardScreen';
import {
  PrivateScreen,
  PublicScreen,
  RestrictedScreen,
  TrashScreen,
} from '../screens/CategoryScreens';
import {
  StatsScreen,
  LogsScreen,
  SettingsScreen,
} from '../screens/OtherScreens';
import SplashScreen from '../screens/SplashScreen';
import { COLORS } from '../constants/theme';
import { RootStackParamList, DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack  = createNativeStackNavigator<RootStackParamList>();

// ─── Drawer (main app) ────────────────────────────────────────────────────────
const DrawerNav: React.FC = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      headerShown:    false,
      drawerStyle:    { width: '72%', backgroundColor: COLORS.background },
      overlayColor:   COLORS.overlay,
      swipeEdgeWidth: 60,
    }}
    initialRouteName="Dashboard"
  >
    <Drawer.Screen name="Dashboard"  component={DashboardScreen} />
    <Drawer.Screen name="Private"    component={PrivateScreen}    />
    <Drawer.Screen name="Public"     component={PublicScreen}     />
    <Drawer.Screen name="Restricted" component={RestrictedScreen} />
    <Drawer.Screen name="Trash"      component={TrashScreen}      />
    <Drawer.Screen name="Stats"      component={StatsScreen}      />
    <Drawer.Screen name="Logs"       component={LogsScreen}       />
    <Drawer.Screen name="Settings"   component={SettingsScreen}   />
  </Drawer.Navigator>
);

// ─── Root Stack: Splash → Main ────────────────────────────────────────────────
const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main"   component={DrawerNav}    />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
