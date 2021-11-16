import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { api } from "../services/api";
import { ActivitiesProps } from "../types/activity";
import { useActivity } from "./ActivityContext";

interface FeedbackProviderProps { children: ReactNode }

interface FeedbackContextProps {
  feedbacks: ActivitiesProps[];
  fetchFeedbacks: () => Promise<void>;
  changeFeedbackFromState: (activity: ActivitiesProps, newFeedback: boolean | undefined) => void;
  removeFeedbackFromState: (activity_id: string) => void;
  isRequested: boolean;
}

const FeedbackContext = createContext({} as FeedbackContextProps)

export function FeedbackProvider({children}: FeedbackProviderProps){
  const [ feedbacks, setFeedbacks ] = useState<ActivitiesProps[]>([])
  const isRequested = useRef(false)

  const { setActivityState } = useActivity()
  
  const fetchFeedbacks = useCallback(async() => {
    if(isRequested.current) { return }

    const { data } = await api.get('/feedback/my-list')
    setFeedbacks(data)
    isRequested.current = true
  },[isRequested.current])

  const changeFeedbackFromState = useCallback((activity: ActivitiesProps, newFeedback: boolean | undefined) => {
    setFeedbacks(prev => {
      let exists = false;
      prev.forEach(item => {
        if(item.id === activity.id) {
          exists = true;
          item.feedback.feedback = newFeedback
        }
      })
      if(exists){
        return prev
      } else {
        return [ activity, ...prev ]
      }
    })
    setActivityState(newFeedback, activity.id)
  },[])

  const removeFeedbackFromState = useCallback((activity_id: string) => {
    setFeedbacks(prev => {
      prev.forEach((item, index) => {
        if(item.id === activity_id){
          prev.splice(index, 1)
        }
      })
      return prev
    })

    setActivityState(undefined, activity_id)
  },[])

  return(
    <FeedbackContext.Provider 
      value={{
        feedbacks,
        fetchFeedbacks,
        changeFeedbackFromState,
        removeFeedbackFromState,
        isRequested: isRequested.current
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback(){
  return useContext(FeedbackContext)
}