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
import { ActivityProvider } from './src/contexts/ActivityContext';
import { FeedbackProvider } from './src/contexts/FeedbackContext';

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
        <ActivityProvider>
          <FeedbackProvider>
            <Routes/>
          </FeedbackProvider>
        </ActivityProvider>
      </UserProvider>
    </>
  );
}