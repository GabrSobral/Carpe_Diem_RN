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
import { ChangePassword } from '../screens/ChangePassword'
import { useEffect } from 'react'
import { useState } from 'react'
import { MyFeedbacks } from '../screens/MyFeedbacks'
import { ActivityDetailsFeedback } from '../screens/ActivityDetailsFeedback'

export function Routes(){
  const { user } = useUsers()
  const [ initialRoute, setInitialRoute ] = useState('BottomTabs')
  const { Navigator, Screen } = createStackNavigator()

  useEffect(() => {
    if(user?.hasAnswered)
      return setInitialRoute("Questionnaire")
  },[user?.hasAnswered])

  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName={initialRoute}
      >
        { !user ? 
          <>
            <Screen name="SignIn"          component={SignIn}/>
            <Screen name="SignUp"          component={SignUp}/>
          </>
          :
          <>
            <Screen name="BottomTabs"      component={BottomTabs}/>
            <Screen name="Questionnaire"   component={Questionnaire}/>
            <Screen name="Clock"           component={Clock}/>
            <Screen name="ActivityDetails" component={ActivityDetails}/>
            <Screen name="ChangePassword" component={ChangePassword}/>
            <Screen name="MyFeedbacks" component={MyFeedbacks}/>
            <Screen name="ActivityDetailsFeedback" component={ActivityDetailsFeedback}/>
          </>
         }
      </Navigator>   
    </NavigationContainer>
  )
}