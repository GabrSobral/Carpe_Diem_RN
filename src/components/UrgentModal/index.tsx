import React, { useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, Animated, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native'

import { api } from "../../services/api";
import { loadUser } from "../../utils/handleStorage";

import alertAnimation from '../../../assets/alert.json'
import { styles } from './style'

interface UrgentModalModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function UrgentModal({ isVisible, closeModal }: UrgentModalModalProps){
  const widthValue = useRef(new Animated.Value(0)).current
  const widthAnim = widthValue.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
  const { navigate } = useNavigation()
  let timer: NodeJS.Timeout;

  useEffect(() => startAnimation(), [startAnimation])

  async function confirmFunction(){
    clearTimeout(timer)
    const userData = await loadUser()

    if(userData && userData.emergency_number) {
      try{
        await api.post('/users/sms', { to: userData?.emergency_number })
      } catch(error: any){
        Alert.alert("Erro ao tentar enviar mensagem de emergência.")
        console.log(error.response)
      }
    } else
      Alert.alert("Nenhum número de emergência foi encontrado, não foi possível enviar a mensagem")
    
    navigate("ClockProtocol" as never)
    closeModal()
  }
  
  function startAnimation(){
    Animated.timing(widthValue, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: false
    }).start();

    timer = setTimeout(confirmFunction, 7000)
  }

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <LottieView
            source={alertAnimation}
            autoPlay
            loop={false}
            style={{ backgroundColor: 'transparent', width: 200, height: 200 }}
          />
          <Text style={styles.title}>Alerta!</Text>
          <Text style={styles.description}>
            Você está prestes a iniciar o protocolo de emergência 
            para crises. {'\n'}O protocolo iniciará automaticamente 
            após o tempo de confirmação
          </Text>

          <View style={styles.quantityContainer}>
            <Animated.View style={[styles.slider, { width: widthAnim }]}/>
          </View>

          <View style={styles.dualButtonsContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, styles.deny]} 
              onPress={() => {clearTimeout(timer); closeModal();}}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, styles.accept]}
              onPress={() => {
                confirmFunction && confirmFunction()
                closeModal();
              }}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}