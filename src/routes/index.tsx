import React from 'react'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useUsers } from '../contexts/UserContext'

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

import { Onboarding } from '../screens/Onboarding'
import { ForgotPassword } from '../screens/ForgotPassword'
import { ResetPassword } from '../screens/ResetPassword'

import { ClockProtocol } from '../screens/Protocol/Clock'
import { GuidedImagination } from '../screens/Protocol/GuidedImagination'
import { InsertCode } from '../screens/InsertCode'
import { Congrats } from '../screens/Congrats'
import { EmergencyNumber } from '../screens/EmergencyNumber'

export function Routes(){
  const { user } = useUsers()
  const { Navigator, Screen } = createStackNavigator()

  if(user === null)
    return <AppLoading/>

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} initialRouteName={"BottomTabs"}>
        { !user ? 
          <>
            <Screen name="SignIn"                    component={SignIn}/>
            <Screen name="SignUp"                    component={SignUp}/>
            <Screen name="ForgotPassword"            component={ForgotPassword}/>
            <Screen name="InsertCode"                component={InsertCode}/>
            <Screen name="ResetPassword"             component={ResetPassword}/>
          </>
          : ((!user.hasAnswered) ? (
            <>
              <Screen name="Onboarding"              component={Onboarding}/>
              <Screen name="EmergencyNumber"         component={EmergencyNumber}/>
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
              
              <Screen name="ClockProtocol"           component={ClockProtocol}/>
              <Screen name="GuidedImagination"       component={GuidedImagination}/>
              <Screen name="Congrats"                component={Congrats}/>
            </>))
         }
      </Navigator>   
    </NavigationContainer>
  )
}