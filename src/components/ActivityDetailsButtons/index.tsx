import React from 'react'
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, View } from 'react-native'
import { styles } from './style'

export function ActivityDetailsButtons(){
  return (
    <View style={styles.handleButtonsContainer}>  
      <RectButton style={[styles.handleButton, styles.reject]}>
        <Text style={styles.handleText}>Descartar</Text>
      </RectButton>

      <RectButton style={[styles.handleButton, styles.confirm]}>
        <Text style={styles.handleText}>Concluir</Text>
      </RectButton>
    </View>
  )
}