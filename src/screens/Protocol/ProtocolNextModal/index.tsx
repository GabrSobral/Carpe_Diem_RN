import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Modal, TouchableOpacity } from 'react-native'

import { styles } from './style'
import { theme } from '../../../styles/theme'
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface UrgentModalModalProps {
  title: string;
  description?: string;
  button: "single" | "finish";
  textSingleButton?: "Prosseguir" | "Entendido"
  isVisible: boolean;
  closeModal: () => void;
  resetFunction?: () => void;
  restart?: boolean;
}

export function ProtocolNextModal({ 
  title, 
  description, 
  button, 
  textSingleButton, 
  isVisible, 
  restart,
  closeModal, 
  resetFunction 
}: UrgentModalModalProps){
  const { navigate } = useNavigation()

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={[styles.popup, restart && { paddingTop: 28 }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {
            restart && 
            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.restartButton}
              onPress={resetFunction}
            >
             <Feather name="repeat" color={theme.colors.white} size={24}/>
            </TouchableOpacity>
          }

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
                    <Text style={styles.buttonText}>Voltar</Text>
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