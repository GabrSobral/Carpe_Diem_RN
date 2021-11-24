import React, { useState } from 'react'
import { RectButton } from "react-native-gesture-handler";
import { Text, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core';

import { ModalComponent } from '../Modal'
import phrases from './phrases.json';
import { ActivitiesProps } from '../../types/activity';
import { theme } from '../../styles/theme';
import { styles } from './style'
import { useActivity } from '../../contexts/ActivityContext';

interface ActivityDetailsButtonsProps {
  activity: ActivitiesProps;
}

export function ActivityDetailsButtons({ activity }: ActivityDetailsButtonsProps){
  const [ isFinishModalVisible, setIsFinishModalVisible ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const { goBack } = useNavigation()

  const { handleFinishActivity } = useActivity()

  async function Finish(){
    setIsLoading(true)
    await handleFinishActivity(activity.id)
    setIsLoading(false)
    setIsFinishModalVisible(true)
  }

  function random(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <View style={styles.handleButtonsContainer}>  
      <ModalComponent 
        title="Parabéns! 😃"
        description={phrases[random(0, phrases.length - 1)].text}
        isVisible={isFinishModalVisible} 
        closeModal={() => setIsFinishModalVisible(false)}
        animation="congrats"
        finishButtonText="Voltar"
        confirmFunction={() => {
          setIsFinishModalVisible(false)
          goBack()
        }}
      />

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