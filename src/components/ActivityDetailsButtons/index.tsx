import React, { useState } from 'react'
import { RectButton } from "react-native-gesture-handler";
import { Text, View } from 'react-native'

import { ModalComponent } from '../Modal'
import { styles } from './style'

export function ActivityDetailsButtons(){
  const [ isFinishModalVisible, setIsFinishModalVisible ] = useState(false)
  const [ isDenyModalVisible, setIsDenyModalVisible ] = useState(false)

  return (
    <View style={styles.handleButtonsContainer}>  
      <ModalComponent 
        title="Parabéns!"
        description="Você conseguiu realizar uma tarefa, isso é ótimo!"
        isVisible={isFinishModalVisible} 
        closeModal={() => setIsFinishModalVisible(false)}
      />

      <ModalComponent 
        title="Oh não..."
        description="Você tem certeza de que deseja descartar essa tarefa?"
        isVisible={isDenyModalVisible}
        dualButtons 
        closeModal={() => setIsDenyModalVisible(false)}
      />

      <RectButton 
        style={[styles.handleButton, styles.reject]}
        onPress={() => setIsDenyModalVisible(true)}
      >
        <Text style={styles.handleText}>Descartar</Text>
      </RectButton>

      <RectButton 
        style={[styles.handleButton, styles.confirm]} 
        onPress={() => setIsFinishModalVisible(true)}
      >
        <Text style={styles.handleText}>Concluir</Text>
      </RectButton>
    </View>
  )
}