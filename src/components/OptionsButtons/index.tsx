import React from 'react'
import { View, Text } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { QuantityOfActivitiesModal } from '../QuantityOfActivitiesModal'
import { useUsers } from '../../contexts/UserContext'

export function OptionsButtons(){
  const { user } = useUsers()
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isQuantityModalVisible, setIsQuantityModalVisible ] = useState(false)

  const { navigate } = useNavigation()

  return(
    <View style={styles.container}>
      {
        isQuantityModalVisible && (
          <QuantityOfActivitiesModal 
            isVisible={isQuantityModalVisible}
            initialValue={user?.quantity_of_activities}
            closeModal={() => setIsQuantityModalVisible(false)}
          />
        )
      }
      

      <RectButton style={styles.optionsButton} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.itemText}>Configurações</Text>
      
        <Octicons 
          name="gear" 
          size={32} 
          color={theme.colors.gray500}
        />
      </RectButton>

      <View style={[styles.optionsContainer, isOpen ? { height: "auto" }:{ height: 0 }]}>
        <RectButton style={styles.optionItemButton} onPress={() => navigate("Questionnaire")}>
          <Text style={styles.optionItemText}>Alterar questionário</Text>
        </RectButton>

        <RectButton style={styles.optionItemButton}>
          <Text style={styles.optionItemText}>Alterar senha</Text>
        </RectButton>

        <RectButton style={styles.optionItemButton} onPress={() => setIsQuantityModalVisible(true)}>
          <Text style={styles.optionItemText}>Alterar quantidade de atividades</Text>
        </RectButton>
      </View>
    </View>
  )
}