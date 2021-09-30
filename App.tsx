import React from 'react';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { UserProvider } from './src/contexts/UserContext'
import AppLoading from 'expo-app-loading';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded)
    return <AppLoading/>
  
  return (
    <>
      <StatusBar  
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <UserProvider>
        <Routes/>
      </UserProvider>
    </>
  );
}