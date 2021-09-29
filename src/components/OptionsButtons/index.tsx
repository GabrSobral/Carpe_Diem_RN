import React, { useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'

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

  const sizeValue = useRef(new Animated.Value(0)).current;
  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 180] })

  function sizeMotionGrown(){
    if(!isOpen){
      Animated.timing(sizeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(sizeValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  }
  const sizeAnim = { height: sizeAnimation }

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
      

      <RectButton 
        style={styles.optionsButton} 
        activeOpacity={0.6}
        onPress={() => {
          setIsOpen(!isOpen)
          sizeMotionGrown()
        }}>
        <Text style={styles.itemText}>Configurações</Text>
      
        <Octicons 
          name="gear" 
          size={32} 
          color={theme.colors.gray500}
        />
      </RectButton>

      <Animated.View style={[styles.optionsContainer,  sizeAnim]}>
        <TouchableOpacity style={styles.optionItemButton} onPress={() => navigate("Questionnaire")}>
          <Text style={styles.optionItemText}>Alterar questionário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItemButton}>
          <Text style={styles.optionItemText}>Alterar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItemButton} onPress={() => setIsQuantityModalVisible(true)}>
          <Text style={styles.optionItemText}>Alterar quantidade de atividades</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}