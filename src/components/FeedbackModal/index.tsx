import React,{ useState } from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { api } from "../../services/api";

import { styles } from './style';
import { theme } from "../../styles/theme";
import { ActivitiesProps } from "../../types/activity";
import { useUsers } from "../../contexts/UserContext";

interface FeedbackModalProps {
  isVisible: boolean;
  closeModal: () => void;
  activity?: ActivitiesProps;
}

export function FeedbackModal({ isVisible, closeModal, activity }: FeedbackModalProps){
  const [ feedback, setFeedback ] = useState<boolean | undefined>(activity?.feedback.feedback)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ previousFeedback, setPreviousFeedback ] = useState<boolean | undefined>(activity?.feedback.feedback)
  const { changeFeedbackFromState, removeFeedbackFromState } = useUsers()

  function handleClick(feedback: boolean){
    if(feedback === previousFeedback) { 
      setPreviousFeedback(undefined)
      return setFeedback(undefined)
    }
    if(feedback === true) {
      setFeedback(true)
    } else {
      setFeedback(false)
    }
    setPreviousFeedback(feedback)
  }

  async function confirmFunction(){
    setIsLoading(true)

    if((activity?.feedback.feedback === true || 
        activity?.feedback.feedback === false) && feedback === undefined) {
      removeFeedbackFromState(activity.id)
      await api.delete(`/feedback/delete/${activity.id}`)
    } else {
      changeFeedbackFromState(activity || {} as ActivitiesProps, feedback)
      await api.post('/feedback/new', { activity: activity?.id, feedback: feedback })
    }
    setIsLoading(false)
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
            <Feather name="x" size={24} color={theme.colors.text}/>
          </TouchableOpacity>

          <Text style={styles.title}>Sua opinião é muito importante para nós!</Text>
          <Text style={styles.description}>O que achou desta atividade?</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.feedbackButton} 
              onPress={() => handleClick(true)}
            >
              <MaterialIcons 
                name={feedback === true ? "thumb-up-alt" : "thumb-up-off-alt"}
                size={50} 
                color={theme.colors.green100}
              />
              <Text style={[styles.feedbackButtonText, { color: theme.colors.green300 }]}>Gostei!</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.feedbackButton} 
              onPress={() => handleClick(false)}
            >
              
              <MaterialIcons 
                name={feedback === false ? "thumb-down-alt" : "thumb-down-off-alt"} 
                size={50} 
                color={theme.colors.red100}
              />
              <Text style={[styles.feedbackButtonText, { color: theme.colors.red300 }]}>Não gostei!</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dualButtonsContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[
                styles.button, 
                ((((activity?.feedback.feedback === undefined) && (feedback === undefined)) || (isLoading)) ||
                (activity?.feedback.feedback === feedback)) && styles.disabled]}
              disabled={((((activity?.feedback.feedback === undefined) && (feedback === undefined)) 
                || (isLoading)) 
                || (activity?.feedback.feedback === feedback))}
              onPress={confirmFunction}
            > 
            { isLoading ? 
              <ActivityIndicator size={22} color={theme.colors.white}/>
              :
              <Text style={styles.buttonText}>
                { (activity?.feedback.feedback !== undefined) ? 
                    ((feedback !== undefined) ? "Alterar feedback" : "Remover feedback" )
                  : 
                "Dar Feedback" }
              </Text>
            }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}