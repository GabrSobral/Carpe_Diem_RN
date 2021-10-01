import React, { useState }  from 'react'
import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native'

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
    <View style={styles.container}>
      <Header/>

        <View style={{ padding: 16 }}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Atividades</Text>
            <Text style={styles.subtitle}>
              Aqui você pode encontrar atividades {'\n'}
              que serão geradas diariamente
            </Text>
          </View>

        { (isFetching && (activities.length === 0)) &&  
          <ActivityIndicator 
            style={{  marginTop: 125 }}
            size={52} 
            color={theme.colors.blue300}/> }

          <FlatList
            style={{ minHeight: 100 }}
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