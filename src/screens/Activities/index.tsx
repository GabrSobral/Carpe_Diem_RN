import React, { useState, useEffect }  from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'

import { useUsers } from '../../contexts/UserContext'
import { ActivitiesProps } from '../../types/activity'
import happyAnimation from '../../../assets/happy.json'
import { styles } from './style'

export function Activities(){
  const { fetchActivities, activities } = useUsers()
  const [ isFetching, setIsFetching ] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      await fetchActivities()
      setIsFetching(false)
    })()
  },[fetchActivities])

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
          data={activities}
          keyExtractor={(item: ActivitiesProps) => item.id}
          ItemSeparatorComponent={() => <View style={{ paddingBottom: 8 }}/>}
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
              onPress={() => navigate('ActivityDetails', { activity: item })}
              key={item.id}
              item={item}
            />}
          onRefresh={async () => await fetchActivities()}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}