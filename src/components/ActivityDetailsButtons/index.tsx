import React, { useState } from 'react'
import { RectButton } from "react-native-gesture-handler";
import { Text, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core';

import { ModalComponent } from '../Modal'
import { useUsers } from '../../contexts/UserContext';
import { ActivitiesProps } from '../../types/activity';
import { theme } from '../../styles/theme';
import { styles } from './style'

interface ActivityDetailsButtonsProps {
  activity: ActivitiesProps;
}

export function ActivityDetailsButtons({ activity }: ActivityDetailsButtonsProps){
  const [ isFinishModalVisible, setIsFinishModalVisible ] = useState(false)
  const [ isDenyModalVisible, setIsDenyModalVisible ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const { goBack } = useNavigation()

  const { handleFinishActivity, handleDeleteActivity } = useUsers()

  async function Finish(){
    setIsLoading(true)
    await handleFinishActivity(activity.id)
    setIsLoading(false)
    setIsFinishModalVisible(true)
  }

  return (
    <View style={styles.handleButtonsContainer}>  
      <ModalComponent 
        title="Parabéns! 😃"
        description="Você conseguiu realizar uma tarefa, isso é ótimo!"
        isVisible={isFinishModalVisible} 
        closeModal={() => setIsFinishModalVisible(false)}
        animation="congrats"
        finishButtonText="Voltar"
        confirmFunction={() => {
          setIsFinishModalVisible(false)
          goBack()
        }}
      />

      <ModalComponent 
        title="Oh não...😟"
        description="Você tem certeza de que deseja descartar essa tarefa?"
        isVisible={isDenyModalVisible}
        dualButtons 
        confirmFunction={async () => {
          await handleDeleteActivity(activity.id)
          setIsDenyModalVisible(false)
          goBack()
        }}
        closeModal={() => setIsDenyModalVisible(false)}
        animation="trash"
      />

      <RectButton 
        style={[styles.handleButton, styles.reject, isLoading && { opacity: 0.7 }]}
        onPress={() => setIsDenyModalVisible(true)}
        enabled={!isLoading}
      >
        <Text style={styles.handleText}>Descartar</Text>
      </RectButton>

      <RectButton 
        style={[styles.handleButton, styles.confirm, isLoading && { opacity: 0.7 }]} 
        onPress={Finish}
        enabled={!isLoading}
      >
        { isLoading ?
          <ActivityIndicator size={20} color={theme.colors.white}/> 
          :
          <Text style={styles.handleText}>Concluir</Text>
        }
      </RectButton>
    </View>
  )
}