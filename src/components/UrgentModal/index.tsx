import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native'
import { View, Text, Modal, TouchableOpacity } from 'react-native'

import alertAnimation from '../../../assets/alert.json'
import { styles } from './style'
import { theme } from "../../styles/theme";
import { api } from "../../services/api";

interface UrgentModalModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function UrgentModal({ isVisible, closeModal }: UrgentModalModalProps){
  async function confirmFunction(){
    await api.post('/users/sms', { to: "5513991599324" })
    closeModal()
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
          </View>

          <View style={styles.dualButtonsContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, styles.deny]} 
              onPress={closeModal}
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
              <Text style={styles.buttonText}>sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}