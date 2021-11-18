import React, { useState, useEffect }  from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'

import { ActivitiesProps } from '../../types/activity'
import happyAnimation from '../../../assets/happy.json'
import { styles } from './style'
import { useActivity } from '../../contexts/ActivityContext'

export function Activities(){
  const { fetchAllActivities, allActivities } = useActivity()
  const [ isFetching, setIsFetching ] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      // await fetchAllActivities()
      setIsFetching(false)
    })()
  },[fetchAllActivities])

  return(
    <SafeAreaView style={styles.container}>
      <Header/>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Atividades</Text>
          <Text style={styles.subtitle}>
            Aqui você pode encontrar atividades {'\n'}
            que serão geradas diariamente
          </Text>
        </View>

        <FlatList
          style={{ minHeight: 200,}}
          data={allActivities}
          keyExtractor={(item: ActivitiesProps) => item.id}
          ListEmptyComponent={
            !isFetching ?
            <View style={styles.noMoreActivitiesContainer}>
              <LottieView
                source={happyAnimation}
                style={{ width: 200, height: 200, backgroundColor: 'transparent' }}
              />
              <Text style={styles.noMoreActivitiesText}>Não há mais atividades para realizar hoje.</Text>
            </View> : <View/>}
          renderItem={({item}) => 
            <ActivityItem 
              onPress={() => navigate('ActivityDetailsFeedback', { activity: item })}
              key={item.id}
              item={item}
            />}
          // onRefresh={async () => await fetchAllActivities()}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}