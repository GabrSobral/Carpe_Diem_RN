import React, { useState }  from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'

import { styles } from './style'
import { useEffect } from 'react'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'

export function Activities(){
  const { fetchActivities, activities } = useUsers()
  const [ isFetching, setIsFetching ] = useState(false)

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

      <ScrollView>
        <View style={{ padding: 16 }}>

         <View style={styles.titleContainer}>
           <Text style={styles.title}>Atividades</Text>
           <Text style={styles.subtitle}>
            Aqui você pode encontrar atividades {'\n'}
            que serão geradas diariamente
          </Text>
         </View>

        { (isFetching && activities.length === 0) &&  
          <ActivityIndicator 
            style={{  marginTop: 125 }}
            size={52} 
            color={theme.colors.blue300}/> }
        
        { activities.map(item => 
          <ActivityItem 
            key={item.id}
            item={item}
          />
        ) }

        </View>
      </ScrollView>
    </View>
  )
}