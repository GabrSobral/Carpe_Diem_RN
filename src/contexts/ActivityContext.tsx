import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../services/api";
import { ActivitiesProps } from "../types/activity";
import { User } from "../types/user";
import { loadUser } from "../utils/handleStorage";
import { useUsers } from "./UserContext";

interface ActivityProviderProps { children: ReactNode }

interface ActivityContextProps {
  activities: ActivitiesProps[];
  fetchActivities: () => Promise<void>;
  handleFinishActivity: (activity_id: string) => Promise<void>;
  setActivityState: (feedback: boolean|undefined, activity_id: string) => void;
  fetchAllActivities: () => Promise<void>;
  allActivities: ActivitiesProps[];
}

const ActivityContext = createContext({} as ActivityContextProps)

export function ActivityProvider({children}: ActivityProviderProps){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])
  const [ allActivities, setAllActivities ] = useState<ActivitiesProps[]>([])
  const { handleUpdate, user } = useUsers()

  const fetchActivities = useCallback(async () => {
    try{
      const { data } = await api.get('/activity/get-activities')
      const storedUser = await loadUser()

      storedUser && (storedUser.activities_finished_today = 0);
      await handleUpdate(storedUser)
      setActivities(data);

    } catch(error: any) {
      console.log(error.response.data)
      if(error.response.data.error === 
        "You already request the activities, try again tomorrow") {
          console.log(error.response.data.error)
          const { data } = await api.get('/activity/my-list')
          setActivities(data);
        }
    }  
  },[])

  const handleFinishActivity = useCallback(async (activity_id: string) => {
    const newArray: ActivitiesProps[] = []
    let newUser = {} as User

    await api.delete(`/activity/finish/${activity_id}`)
    activities.forEach(item => item.id !== activity_id && newArray.push(item))
    setActivities(newArray)
    
    const all_activities_finished = (user?.all_activities_finished || 0) + 1;
    const activities_finished_today = (user?.activities_finished_today || 0) +1;

    await handleUpdate({ all_activities_finished, activities_finished_today })
  },[activities, user?.activities_finished_today, user?.all_activities_finished])

  const setActivityState = useCallback((feedback: boolean|undefined, activity_id: string) => {
    setActivities(prev => prev.map(item => {
      if(item.id === activity_id){
        item.feedback.feedback = feedback
      }
      return item
    }))

    setAllActivities(prev => prev.map(item => {
      if(item.id === activity_id){
        item.feedback.feedback = feedback
      }
      return item
    }))
  },[])

  const fetchAllActivities = useCallback(async() => {
    try{
      const { data } = await api.get('/activity/list')
      setAllActivities(data);
    } catch(error: any) {
      console.log(error.response.data)
    }  
  },[])

  return(
    <ActivityContext.Provider 
      value={{
        activities,
        fetchActivities,
        handleFinishActivity,
        setActivityState,
        fetchAllActivities,
        allActivities
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity(){
  return useContext(ActivityContext)
}