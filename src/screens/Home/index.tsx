import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from '../../components/Header'

import { styles } from './style'
import { HomeItem } from '../../components/HomeItem';
import { CircularProgressBar } from '../../components/CircularProgressBar'

export function Home(){
  return (
    <View style={styles.container}>
      <Header/>

      <ScrollView style={{ padding: 16 }}>
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.title}>Tarefas concluídas</Text>
          
          <CircularProgressBar/>

          <Text style={styles.title}>Confira também</Text>

          <HomeItem/>
        </View>
      </ScrollView>

    </View>
  )
}