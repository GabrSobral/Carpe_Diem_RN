import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Modal, TouchableOpacity } from 'react-native'

import { styles } from './style'
import { theme } from '../../../styles/theme'
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface UrgentModalModalProps {
  title: string;
  description?: string;
  button: "single" | "two" |"finish";
  textSingleButton?: "Prosseguir" | "Entendido"
  isVisible: boolean;
  closeModal: () => void;
  resetFunction?: () => void;
  restart?: boolean;
  nextRoute?: string;
}
interface Button {
  text: string;
  action?: () => void;
  stylesComp: Object;
}

export function ProtocolNextModal({ 
  title, 
  description, 
  button, 
  textSingleButton, 
  isVisible, 
  restart,
  closeModal, 
  resetFunction,
  nextRoute
}: UrgentModalModalProps){
  const { navigate } = useNavigation()

  function Button({ text, action, stylesComp }: Button){
    return(
      <TouchableOpacity 
        activeOpacity={0.5}
        style={stylesComp} 
        onPress={action}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    )
  }

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
            button === "single" &&      
              <Button 
                text={textSingleButton || ''} 
                action={closeModal}
                stylesComp={styles.singleButton}
              /> 
          }
          {
            button === "two" &&      
            <View style={styles.finalButtonsContainer}>
              <Button 
                text="Prosseguir" 
                action={() => {
                  closeModal();
                  navigate(nextRoute || 'BottomTabs') as never}
                }
                stylesComp={[styles.button, { width: '100%'}]}
              />
      
              <Button 
                text="Retornar para a tela inicial" 
                action={() => {
                  closeModal();
                  navigate('BottomTabs' as never)
                }}
                stylesComp={styles.returnToHomeButton}
              />
            </View>
          }
          { 
            button === "finish" &&
              <View style={styles.finalButtonsContainer}>
                <View style={styles.repeatAndNextContainer}>
                  <Button 
                    text="Voltar" 
                    action={resetFunction}
                    stylesComp={styles.button}
                  />
                  <Button 
                    text="Prosseguir" 
                    action={() => {}}
                    stylesComp={styles.button}
                  />
                </View>
        
                <Button 
                  text="Retornar para a tela inicial" 
                  action={() => {
                    closeModal();
                    navigate('BottomTabs' as never)
                  }}
                  stylesComp={styles.returnToHomeButton}
                />
              </View>
          }
        </View>
      </View>
    </Modal>
  )
}