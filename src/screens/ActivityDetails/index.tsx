import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { Player } from '../../components/Player'
import { ActivityDetailsButtons } from '../../components/ActivityDetailsButtons'
import { ActivitiesProps } from '../../types/activity'

import { styles } from './style'
import { ModalComponent } from '../../components/Modal'

interface Params {
  activity: ActivitiesProps;
}

export function ActivityDetails({}){
  const { params } = useRoute()
  const { activity } = params as Params

  return(
    <View style={styles.container}>
      <Header canGoBack/>

      <ScrollView>
        <View style={{ padding: 16, alignItems: 'center' }}>

          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>

            </View>
            <View style={styles.contentSelectedContainer}>
              <Text style={styles.title}>{activity.title}</Text>
              <Text style={styles.subtitle}>{activity.description}</Text>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{activity.body}</Text>
          </View>

          <View style={styles.feedbackTextContainer}>
            <Text style={styles.feedbackText}>
              O que achou da atividade? 
            </Text>

            <TouchableOpacity style={{ marginLeft: 5 }}>
              <Text style={styles.feedbackButtonText}>Nos dê um feedback!</Text>
            </TouchableOpacity>
          </View>

          <Player/>

          <ActivityDetailsButtons/>
        </View>
        
      </ScrollView>
    </View>
  )
}