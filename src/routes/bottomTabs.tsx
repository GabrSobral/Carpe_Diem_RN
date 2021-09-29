import React from 'react'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home'
import { Activities } from '../screens/Activities'
import { Profile } from '../screens/Profile'

export function BottomTabs(){
  const { Navigator, Screen } = createBottomTabNavigator()

  return (
    <Navigator
      detachInactiveScreens
      initialRouteName="HomeScreen"
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarStyle: { height: 60 }
      }}
    >
      <Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: (({ size, color}) => (
            <Feather
              name="list"
              size={30}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: (({ size, color}) => (
            <Feather
              name="home"
              size={30}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (({ size, color}) => (
            <Feather
              name="user"
              size={30}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  )
}