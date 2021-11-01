import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import congratsAnimation from '../../../assets/congrats.json'
import trashAnimation from '../../../assets/trash.json'
import logoutAnimation from '../../../assets/logout.json'
import mailAnimation from '../../../assets/mail.json'
import passwordAnimation from '../../../assets/password.json'

import { styles } from './style';

interface ModalComponentProps {
  isVisible: boolean;
  dualButtons?: boolean;
  closeModal: () => void;
  title: string;
  description: string;
  confirmFunction: () => void;
  animation?: "congrats" | 'trash' | 'logout' | "sendMail" | "password",
  finishButtonText?: string
}

const animations = {
  congrats: 
    <LottieView
      source={congratsAnimation}
      autoPlay
      loop={false}
      style={styles.animation}
    />,
  trash:
    <LottieView
      source={trashAnimation}
      autoPlay
      loop={false}
      style={styles.animation}
    />,
  logout:
    <LottieView
      source={logoutAnimation}
      autoPlay
      loop={false}
      style={styles.animation}
    />,
  sendMail:
    <LottieView
      source={mailAnimation}
      autoPlay
      loop={true}
      style={styles.animation}
    />,
  password:
    <LottieView
      source={passwordAnimation}
      autoPlay
      loop={false}
      style={styles.animation}
    />
}

export function ModalComponent({ 
  isVisible, 
  closeModal, 
  dualButtons = false,
  title,
  description,
  confirmFunction,
  animation,
  finishButtonText
}: ModalComponentProps){

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          {animation && animations[animation]}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.dualButtonsContainer}>
            { dualButtons ? 
              <>
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
                onPress={confirmFunction}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
              </>
              :
              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, styles.finishButton]} 
                onPress={confirmFunction}
              >
               <Text style={styles.buttonText}>{finishButtonText}</Text>
             </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}