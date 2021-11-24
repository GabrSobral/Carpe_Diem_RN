import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { api } from "../services/api";
import { ActivitiesProps } from "../types/activity";
import { useActivity } from "./ActivityContext";

interface FeedbackProviderProps { children: ReactNode }

interface FeedbackContextProps {
  feedbacks: ActivitiesProps[];
  fetchFeedbacks: () => Promise<void>;
  changeFeedbackFromState: (activity: ActivitiesProps, newFeedback: boolean | undefined) => void;
  isRequested: React.MutableRefObject<boolean>;
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
      if(prev.length === 0 && !newFeedback)
        return prev;
      else
        prev.forEach((item, index) => {
          if((item.id === activity.id)) {
            exists = true;
            if(!newFeedback) 
              prev.splice(index, 1);
            else 
              item.feedback.feedback = newFeedback;
          };
        });
        if(!exists && !newFeedback) { return prev }
      return exists ? prev : [ activity, ...prev ];
    })
    setActivityState(newFeedback, activity.id)
  },[])

  return(
    <FeedbackContext.Provider 
      value={{
        feedbacks,
        fetchFeedbacks,
        changeFeedbackFromState,
        isRequested
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback(){
  return useContext(FeedbackContext)
}