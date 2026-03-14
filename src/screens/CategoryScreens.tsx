import React from 'react';
import CategoryScreen from './CategoryScreen';

export const PrivateScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <CategoryScreen navigation={navigation} category="Private" />
);

export const PublicScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <CategoryScreen navigation={navigation} category="Public" />
);

export const RestrictedScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <CategoryScreen navigation={navigation} category="Restricted" />
);

export const TrashScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <CategoryScreen navigation={navigation} category="Trash" />
);
