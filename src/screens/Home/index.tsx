import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import LottieView from 'lottie-react-native'

import { Header } from '../../components/Header'
import { HomeItem } from '../../components/HomeItem';
import { useActivity } from '../../contexts/ActivityContext'
import { ActivityItem } from '../../components/ActivityItem'
import { ProgressBar } from '../../components/ProgressBar'

import { ActivitiesProps } from '../../types/activity'
import happyAnimation from '../../../assets/happy.json'
import { styles } from './style'
import { useUsers } from '../../contexts/UserContext'

export function Home(){
  const { fetchActivities, activities } = useActivity()
  const [ isFetching, setIsFetching ] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      await fetchActivities()
      setIsFetching(false)
    })()
  },[fetchActivities])

  return (
    <View style={styles.container}>
      <Header/>

      <View style={{ padding: 16, paddingBottom: 70 }}>
        <FlatList
          nestedScrollEnabled
          data={activities}
          keyExtractor={(item: ActivitiesProps) => item.id}
          ListHeaderComponent={() =>
            <>
              <Text style={styles.title}>Tarefas diárias</Text>
              <ProgressBar/>
            </>
          }
          ListEmptyComponent={
            !isFetching ?
            <View style={styles.noMoreActivitiesContainer}>
              <LottieView
                source={happyAnimation}
                style={{ width: 130, height: 130, backgroundColor: 'transparent' }}
              />
              <Text style={styles.noMoreActivitiesText}>Ebaa! Você realizou todas as atividades propostas.</Text>
            </View> : <View/>}
          renderItem={({item}) => 
            <ActivityItem 
              onPress={() => navigate('ActivityDetails', { activity: item })}
              key={item.id}
              item={item}
            />}
          onRefresh={async () => await fetchActivities()}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => 
            <>
              <Text style={styles.title}>Confira também</Text>
              <HomeItem/>
            </>
          }
        />
      </View>
    </View>
  )
}