import React, { useState } from 'react'
import { RectButton } from "react-native-gesture-handler";
import { Text, View, ActivityIndicator } from 'react-native'

import { ModalComponent } from '../Modal'
import { styles } from './style'
import { ActivitiesProps } from '../../types/activity';
import { useUsers } from '../../contexts/UserContext';
import { theme } from '../../styles/theme';

interface ActivityDetailsButtonsProps {
  activity: ActivitiesProps;
}

export function ActivityDetailsButtons({ activity }: ActivityDetailsButtonsProps){
  const [ isFinishModalVisible, setIsFinishModalVisible ] = useState(false)
  const [ isDenyModalVisible, setIsDenyModalVisible ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const { handleFinishActivity, handleDeleteActivity } = useUsers()

  async function Finish(){
    setIsLoading(true)
    handleFinishActivity(activity.id)
      .then(() => {
        setIsLoading(false)
        setIsFinishModalVisible(true)
      })
  }

  return (
    <View style={styles.handleButtonsContainer}>  
      <ModalComponent 
        title="Parabéns!"
        description="Você conseguiu realizar uma tarefa, isso é ótimo!"
        isVisible={isFinishModalVisible} 
        closeModal={() => setIsFinishModalVisible(false)}
        animation="congrats"
      />

      <ModalComponent 
        title="Oh não..."
        description="Você tem certeza de que deseja descartar essa tarefa?"
        isVisible={isDenyModalVisible}
        dualButtons 
        confirmFunction={() => handleDeleteActivity(activity.id)}
        closeModal={() => setIsDenyModalVisible(false)}
        animation="trash"
      />

      <RectButton 
        style={[styles.handleButton, styles.reject]}
        onPress={() => setIsDenyModalVisible(true)}
      >
        <Text style={styles.handleText}>Descartar</Text>
      </RectButton>

      <RectButton 
        style={[styles.handleButton, styles.confirm]} 
        onPress={Finish}
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