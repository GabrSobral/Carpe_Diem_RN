import React, { useState, useEffect }  from 'react'
import { View, Text, FlatList } from 'react-native'
import LottieView from 'lottie-react-native'

import { Header } from '../../components/Header'

import happyAnimation from '../../../assets/happy.json'
import { ActivitiesProps } from '../../types/activity'
import { styles } from '../Activities/style'
import { useFeedback } from '../../contexts/FeedbackContext'
import { ActivityItem } from '../../components/ActivityItem'
import { useNavigation } from '@react-navigation/core'

export function MyFeedbacks(){
  const { feedbacks, fetchFeedbacks, isRequested } = useFeedback()
  const [ isFetching, setIsFetching ] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      await fetchFeedbacks()
      setIsFetching(false)
    })()
  },[feedbacks.length, fetchFeedbacks])

  return(
    <View style={styles.container}>
      <Header canGoBack/>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meus favoritos</Text>
          <Text style={styles.subtitle}>
            Seus favoritos influenciam na {'\n'}
            escolha das atividades diárias. Você {'\n'}
            pode revisá-los aqui!
          </Text>
        </View>
      
        <FlatList
          style={{ minHeight: 200 }}
          data={feedbacks}
          keyExtractor={(item: ActivitiesProps) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => 
            <ActivityItem 
              onPress={() => { navigate('ActivityDetailsFeedback', { activity: item }) }}
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
              <Text style={styles.noMoreActivitiesText}>Não há feedbacks para mostrar.</Text>
            </View> : <View/>}
          refreshing={isFetching}
          onRefresh={async () => await fetchFeedbacks()}
        />

      </View>
    </View>
  )
}