import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Modal, TouchableOpacity } from 'react-native'

import { styles } from './style';

interface ModalComponentProps {
  isVisible: boolean;
  dualButtons?: boolean;
  closeModal: () => void;
  title: string;
  description: string;
}

export function ModalComponent({ 
  isVisible, 
  closeModal, 
  dualButtons = false,
  title,
  description
}: ModalComponentProps){
  const { goBack } = useNavigation()

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
                style={[styles.button, styles.accept]}>
                <Text style={styles.buttonText}>sim</Text>
              </TouchableOpacity>
              </>
              :
              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, styles.finishButton]} 
                onPress={() => { 
                  closeModal();
                  goBack();
                }}
              >
               <Text style={styles.buttonText}>Fechar</Text>
             </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}