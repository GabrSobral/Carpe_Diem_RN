import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import content from './content.json'
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'

import { styles } from './style'
import { theme } from "../../../styles/theme";

interface UrgentModalModalProps {
  title: string;
  description?: string;
  button: "single" | "finish";
  textSingleButton?: "Prosseguir" | "Entendido"
  isVisible: boolean;
  closeModal: () => void;
  resetFunction?: () => void;
}

export function ProtocolNextModal(
  { title, description, button, textSingleButton, isVisible, closeModal, resetFunction }: UrgentModalModalProps){
  const { navigate } = useNavigation()

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {
            button === "single" ? (
              <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.singleButton}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>{textSingleButton}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.finalButtonsContainer}>
                <View style={styles.repeatAndNextContainer}>
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.button} 
                    onPress={resetFunction}
                  >
                    <Text style={styles.buttonText}>Repetir exercício</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => {}}
                  >
                    <Text style={styles.buttonText}>Prosseguir</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  onPress={() => {
                    closeModal()
                    navigate('BottomTabs')
                  }}
                  activeOpacity={0.7}
                  style={styles.returnToHomeButton}
                >
                  <Text style={styles.buttonText}>Retornar para a tela inicial</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </View>
    </Modal>
  )
}