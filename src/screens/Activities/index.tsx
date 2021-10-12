import React, { useState }  from 'react'
import { View, Text, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'

import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'

import { styles } from './style'
import { useEffect } from 'react'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { ActivitiesProps } from '../../types/activity'

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
          style={{ minHeight: 200}}
          data={activities}
          keyExtractor={(item: ActivitiesProps) => item.id}
          ItemSeparatorComponent={() => <View style={{ paddingBottom: 8 }}/>}
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