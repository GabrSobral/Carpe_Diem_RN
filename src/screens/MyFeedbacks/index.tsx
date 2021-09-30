import React, { useState }  from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'
import { FeedbackModal } from '../../components/FeedbackModal'

import { styles } from './style'
import { useEffect } from 'react'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { ActivitiesProps } from '../../types/activity'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

export function MyFeedbacks(){
  const { fetchActivities, activities } = useUsers()
  const [ isFetching, setIsFetching ] = useState(false)
  const [ isFeedbackModalVisible, setIsFeedbackModalVisible ] = useState(false)
  const { navigate } = useNavigation()

  return(
    <View style={styles.container}>
      { isFeedbackModalVisible &&
        <FeedbackModal
          closeModal={() => setIsFeedbackModalVisible(false)}
          isVisible={isFeedbackModalVisible}
        />
      }

      <Header canGoBack/>

      <View style={{ padding: 16 }}>

        <View style={styles.titleContainer}>
        <Text style={styles.title}>Meus feedbacks</Text>
        <Text style={styles.subtitle}>
          Seus feedbacks influenciam na {'\n'}
          escolha das atividades diárias. Você {'\n'}
          pode revisar os feedbacks aqui!
        </Text>
        </View>

      { (isFetching && (activities.length === 0)) &&  
        <ActivityIndicator 
          style={{  marginTop: 125 }}
          size={52} 
          color={theme.colors.blue300}/> }
      
        <FlatList
          data={activities}
          keyExtractor={(item: ActivitiesProps) => item.id}
          renderItem={({item}) => 
            <ActivityItem 
              onPress={() => navigate('ActivityDetails', { activity: item })}
              key={item.id}
              item={item}
            />}
          onRefresh={async () => await fetchActivities()}
          refreshing={false}
        />

      </View>
    </View>
  )
}