import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { Questionnaire } from '../screens/Questionnaire'
import { Home } from '../screens/Home'

import { useUsers } from '../contexts/UserContext'
import { Clock } from '../screens/Clock'
import { BottomTabs } from './bottomTabs'

export function Routes(){
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName="Home"
      >
        <Screen
          name="SignIn"
          component={SignIn}
        />

        <Screen
          name="SignUp"
          component={SignUp}
        />

        <Screen
          name="Questionnaire"
          component={Questionnaire}
        />

        <Screen
          name="Home"
          component={BottomTabs}
        />

        <Screen
          name="Clock"
          component={Clock}
        />
      </Navigator>   
    </NavigationContainer>
  )
}