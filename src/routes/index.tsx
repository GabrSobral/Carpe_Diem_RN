import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { Questionnaire } from '../screens/Questionnaire'

import { useUsers } from '../contexts/UserContext'
import { Clock } from '../screens/Clock'
import { BottomTabs } from './bottomTabs'
import { ActivityDetails } from '../screens/ActivityDetails'

export function Routes(){
  const { user } = useUsers()
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName={user?.hasAnswered ? "BottomTabs" : "Questionnaire"}
      >
        { !user ? 
          <>
            <Screen name="SignIn"          component={SignIn}/>
            <Screen name="SignUp"          component={SignUp}/>
          </>
          :
          <>
            <Screen name="BottomTabs"            component={BottomTabs}/>
            <Screen name="Questionnaire"   component={Questionnaire}/>
            <Screen name="Clock"           component={Clock}/>
            <Screen name="ActivityDetails" component={ActivityDetails}/>
          </>
         }
      </Navigator>   
    </NavigationContainer>
  )
}