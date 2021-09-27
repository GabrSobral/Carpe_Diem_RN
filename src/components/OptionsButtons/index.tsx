import React from 'react'
import { View, Text } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export function OptionsButtons(){
  const [ isOpen, setIsOpen ] = useState(false)
  const { navigate } = useNavigation()

  return(
    <View style={styles.container}>
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
      </View>
    </View>
  )
}