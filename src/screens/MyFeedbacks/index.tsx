import React, { useState, useEffect }  from 'react'
import { View, Text, FlatList } from 'react-native'
import LottieView from 'lottie-react-native'

import { Header } from '../../components/Header'
import { ActivityItemSwipeable } from '../../components/ActivityItemSwipeable'
import { FeedbackModal } from '../../components/FeedbackModal'

import happyAnimation from '../../../assets/happy.json'
import { ActivitiesProps } from '../../types/activity'
import { useUsers } from '../../contexts/UserContext'
import { styles } from '../Activities/style'

export function MyFeedbacks(){
  const { feedbacks, fetchFeedbacks, isRequested } = useUsers()
  const [ selectedActivity, setSelectedActivity ] = useState<ActivitiesProps | undefined>(undefined)
  const [ isFetching, setIsFetching ] = useState(false)
  const [ isFeedbackModalVisible, setIsFeedbackModalVisible ] = useState(false)

  useEffect(() => {
    (async () => {
      if(isRequested) { return }
      setIsFetching(true)
      await fetchFeedbacks()
      setIsFetching(false)
    })()
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
          ListEmptyComponent={
            isRequested ?
            <View style={styles.noMoreActivitiesContainer}>
              <LottieView
                source={happyAnimation}
                style={{ width: 200, height: 200, backgroundColor: 'transparent' }}
              />
              <Text style={styles.noMoreActivitiesText}>Não há feedbacks mostrar.</Text>
            </View> : <View/>}
          refreshing={isFetching}
          onRefresh={async () => await fetchFeedbacks()}
        />

      </View>
    </View>
  )
}