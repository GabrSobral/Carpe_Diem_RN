import React,{ useState } from "react";
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { api } from "../../services/api";

import { styles } from './style';
import { theme } from "../../styles/theme";

interface FeedbackModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function FeedbackModal({ isVisible, closeModal }: FeedbackModalProps){
  const [ feedback, setFeedback ] = useState<boolean | null>(null)

  async function confirmFunction(){
    // await api.patch('/users', { quantity_of_activities: feedback })

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
          <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
            <Feather name="x" size={32} color={theme.colors.text}/>
          </TouchableOpacity>

          <Text style={styles.title}>Sua opinião é muito importante para nós!</Text>
          <Text style={styles.description}>O que achou desta atividade?</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.feedbackButton} 
              onPress={() => setFeedback(true)}
            >
              <MaterialIcons name={feedback === true ? "thumb-up-alt" : "thumb-up-off-alt"}size={50} color={theme.colors.green300}/>
              <Text style={[styles.feedbackButtonText, { color: theme.colors.green300 }]}>Gostei</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.feedbackButton} 
              onPress={() => setFeedback(false)}
            >
              
              <MaterialIcons name={feedback === false ? "thumb-down-alt" : "thumb-down-off-alt"} size={50} color={theme.colors.red300}/>
              <Text style={[styles.feedbackButtonText, { color: theme.colors.red300 }]}>Não gostei</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dualButtonsContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, feedback === null && styles.disabled]}
              disabled={feedback === null}
              onPress={() => {
                confirmFunction && confirmFunction()
                closeModal();
              }}
            >
              <Text style={styles.buttonText}>Dar Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}