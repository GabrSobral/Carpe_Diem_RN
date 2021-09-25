import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CircularProgress from 'react-native-circular-progress-indicator';
import { Header } from '../../components/Header'

import { styles } from './style'
import { theme } from '../../styles/theme';

export function Home(){
  return (
    <View style={styles.container}>
      <Header/>

      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.title}>Tarefas concluídas</Text>
        
        <View style={styles.progressBarContainer}>
          <CircularProgress 
            value={75}
            radius={100}
            textColor={theme.colors.text}
            valueSuffix={'%'}
            activeStrokeWidth={7}
            activeStrokeColor={theme.colors.green300}
            inActiveStrokeWidth={4}
            inActiveStrokeColor={theme.colors.green300}
            inActiveStrokeOpacity={0.5}
          />
        </View>

        <Text style={styles.title}>Confira também</Text>

        
      </ScrollView>

    </View>
  )
}