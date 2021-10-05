import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { QuestionnaireInitial } from '../screens/QuestionnaireInitial'
import { QuestionnaireAfter } from '../screens/QuestionnaireAfter'
import { Clock } from '../screens/Clock'
import { BottomTabs } from './bottomTabs'
import { ActivityDetails } from '../screens/ActivityDetails'
import { ChangePassword } from '../screens/ChangePassword'
import { MyFeedbacks } from '../screens/MyFeedbacks'
import { ActivityDetailsFeedback } from '../screens/ActivityDetailsFeedback'

import { useUsers } from '../contexts/UserContext'
import { Onboarding } from '../screens/Onboarding'

export function Routes(){
  const { user } = useUsers()
  const { Navigator, Screen } = createStackNavigator()

  // if(!user && firstAccess)
  //   return <AppLoading/>

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} initialRouteName={"BottomTabs"}>
        { !user ? 
          <>
            <Screen name="SignIn"                  component={SignIn}/>
            <Screen name="SignUp"                  component={SignUp}/>
          </>
          : ((!user.hasAnswered) ? (
            <>
              <Screen name="Onboarding"              component={Onboarding}/>
              <Screen name="QuestionnaireInitial"    component={QuestionnaireInitial}/>
            </>
            ) : (
            <>
              <Screen name="BottomTabs"              component={BottomTabs}/>
              <Screen name="Clock"                   component={Clock}/>
              <Screen name="ActivityDetails"         component={ActivityDetails}/>
              <Screen name="ChangePassword"          component={ChangePassword}/>
              <Screen name="MyFeedbacks"             component={MyFeedbacks}/>
              <Screen name="ActivityDetailsFeedback" component={ActivityDetailsFeedback}/>
              <Screen name="QuestionnaireAfter"      component={QuestionnaireAfter}/>
            </>))
         }
      </Navigator>   
    </NavigationContainer>
  )
}