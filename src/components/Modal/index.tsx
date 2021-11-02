import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { theme } from "../../styles/theme";
import { ModalAnimations } from './animations'

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
  const [ isLoading, setIsLoading ] = useState(false)

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          
          {animation && <ModalAnimations animation={animation}/>}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.dualButtonsContainer}>
            { dualButtons ? 
              <>
              <TouchableOpacity 
                activeOpacity={0.7}
                disabled={isLoading}
                style={[styles.button, styles.deny, isLoading && styles.disabled]} 
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, styles.accept, isLoading && styles.disabled]}
                disabled={isLoading}
                onPress={() => {
                  setIsLoading(true)
                  confirmFunction()
                }}
              >
                { isLoading ? 
                  <ActivityIndicator size={22} color={theme.colors.white}/>
                  :
                  <Text style={styles.buttonText}>Sim</Text>
                }
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