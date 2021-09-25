import React from 'react'
import { View, Text } from 'react-native'
import { Header } from '../../components/Header'

import { styles } from './style'

export function Activities(){
  return(
    <View style={styles.container}>
      <Header/>
      <Text>Activities</Text>
    </View>
  )
}