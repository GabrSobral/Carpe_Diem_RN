import React, { useState }  from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'


import { Header } from '../../components/Header'
import { ActivityItem } from '../../components/ActivityItem'

import { styles } from './style'
import { useEffect } from 'react'
import { api } from '../../services/api'
import { ActivitiesProps } from '../../types/activity'
import { theme } from '../../styles/theme'
import { saveActivity } from '../../utils/handleStorage'

export function Activities(){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])

  useEffect(() => {
    api.get('/activity/get-activities')
      .then(({ data }) => {
        (async () => await saveActivity(data))();
        setActivities(data);
      })
      .catch((error) => {

        if(error.response.data.error === 
          "You already request the activities, try again tomorrow") {
            api.get('/activity/my-list')
              .then(({data}) => {
                (async () => await saveActivity(data))();
                setActivities(data);
              })
          }
      })
  },[])

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

        { !activities &&  
          <ActivityIndicator 
            style={{ marginTop: 16 }}
            size={32} 
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