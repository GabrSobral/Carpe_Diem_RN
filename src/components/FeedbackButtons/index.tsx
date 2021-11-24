import React,{ useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from "../../services/api";

import { styles } from './style';
import { theme } from "../../styles/theme";
import { ActivitiesProps } from "../../types/activity";
import { useFeedback } from "../../contexts/FeedbackContext";

interface FeedbackModalProps {
  activity?: ActivitiesProps;
}

export function FeedbackButtons({ activity }: FeedbackModalProps){
  const [ feedback, setFeedback ] = useState<boolean | undefined>(activity?.feedback.feedback)
  const [ previousFeedback, setPreviousFeedback ] = useState<boolean | undefined>(activity?.feedback.feedback)
  const { changeFeedbackFromState } = useFeedback()

  async function handleClick(feedback: boolean){
    if(activity && feedback === previousFeedback) { 
      setPreviousFeedback(undefined)
      setFeedback(undefined)
      changeFeedbackFromState(activity || {} as ActivitiesProps, undefined)
      await api.delete(`/feedback/delete/${activity.id}`)
      return 
    }
    if(feedback === true)
      setFeedback(true)
    else if(feedback === false)
      setFeedback(false)

    setPreviousFeedback(feedback)

    changeFeedbackFromState(activity || {} as ActivitiesProps, feedback)
    await api.post('/feedback/new', { activity: activity?.id, feedback: feedback })
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.feedbackButton, { marginRight: 16 }]} 
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
  )
}