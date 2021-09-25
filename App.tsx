import React from 'react';
import { View, StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { UserProvider } from './src/contexts/UserContext'

export default function App() {
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