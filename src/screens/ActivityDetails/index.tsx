import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { Player } from '../../components/Player'
import { ActivityDetailsButtons } from '../../components/ActivityDetailsButtons'
import { ActivitiesProps } from '../../types/activity'

import { styles } from './style'

import { FeedbackModal } from '../../components/FeedbackModal'
import { RemoveHTML } from '../../utils/handleRemoveHTML'
import { ActivitiesIcons } from '../../components/ActivitiesIcons'

interface Params {
  activity: ActivitiesProps;
}

export function ActivityDetails({}){
  const [ isFeedbackModalVisible, setIsFeedbackModalVisible ] = useState(false)

  const { params } = useRoute()
  const { activity } = params as Params

  return(
    <View style={styles.container}>
      { isFeedbackModalVisible && 
        <FeedbackModal
          activity={activity}
          closeModal={() => setIsFeedbackModalVisible(false) }
          isVisible={isFeedbackModalVisible}
        />
      }

      <Header canGoBack/>

      <ScrollView>
        <View style={{ padding: 16, alignItems: 'center' }}>

          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <ActivitiesIcons category={activity.category.name}/>
            </View>
            <View style={styles.contentSelectedContainer}>
              <Text style={styles.title}>{activity.title}</Text>
              <Text style={styles.subtitle}>{activity.description}</Text>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{RemoveHTML(activity.body)}</Text>
          </View>

          <View style={styles.feedbackTextContainer}>
            <Text style={styles.feedbackText}>
              O que achou da atividade? 
            </Text>

            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => setIsFeedbackModalVisible(true)}>
              <Text style={styles.feedbackButtonText}>Nos dê um feedback!</Text>
            </TouchableOpacity>
          </View>

          { activity.files.map(item => {
            if(item.format === "mp3")
              return <Player file={item} key={item.id}/>

            return <Text key={item.id}></Text>
          }) }

          <ActivityDetailsButtons activity={activity}/>
        </View>
        
      </ScrollView>
    </View>
  )
}