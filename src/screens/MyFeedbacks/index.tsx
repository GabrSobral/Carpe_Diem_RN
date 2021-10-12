import React, { useState }  from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'

import { Header } from '../../components/Header'
import { ActivityItemSwipeable } from '../../components/ActivityItemSwipeable'
import { FeedbackModal } from '../../components/FeedbackModal'

import { styles } from './style'
import { useEffect } from 'react'
import { theme } from '../../styles/theme'
import { ActivitiesProps } from '../../types/activity'
import { useNavigation } from '@react-navigation/native'
import { useUsers } from '../../contexts/UserContext'

export function MyFeedbacks(){
  const { feedbacks, fetchFeedbacks } = useUsers()
  const [ selectedActivity, setSelectedActivity ] = useState<ActivitiesProps | undefined>(undefined)
  const [ isFetching, setIsFetching ] = useState(false)
  const [ isFeedbackModalVisible, setIsFeedbackModalVisible ] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    setIsFetching(true)
    fetchFeedbacks()
    setIsFetching(false)
  },[feedbacks.length, fetchFeedbacks])

  return(
    <View style={styles.container}>
      { isFeedbackModalVisible &&
        <FeedbackModal
          activity={selectedActivity}
          closeModal={() => setIsFeedbackModalVisible(false)}
          isVisible={isFeedbackModalVisible}
        />
      }

      <Header canGoBack/>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meus feedbacks</Text>
          <Text style={styles.subtitle}>
            Seus feedbacks influenciam na {'\n'}
            escolha das atividades diárias. Você {'\n'}
            pode revisar os feedbacks aqui!
          </Text>
        </View>
      
        <FlatList
          style={{ minHeight: 200 }}
          data={feedbacks}
          keyExtractor={(item: ActivitiesProps) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 8 }}/>}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => 
            <ActivityItemSwipeable 
              onPress={() => {
                setIsFeedbackModalVisible(true)
                setSelectedActivity(item)
              }}
              key={item.id}
              item={item}
            />}
          refreshing={isFetching}
          onRefresh={async () => await fetchFeedbacks()}
        />

      </View>
    </View>
  )
}