import React,{ useCallback } from "react";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { ActivitiesProps } from "../types/activity";
import { User } from "../types/user";
import { loadRefreshToken, loadUser, removeActivity, removeRefreshToken, removeUser, saveActivities, saveRefreshToken, saveUser } from "../utils/handleStorage";
import { getToken, removeToken, setToken } from "../utils/handleToken";

interface UserProviderProps {
  children: ReactNode;
}
interface SignProps {
  name?: String;
  email: String;
  password: String;
  query?: '/login' | '/users'
}
interface SignResult {
  data: {
    user: {
      id: String;
      name: String;
      email: String;
      created_at: Date;
      updated_at: Date;
    };
    token: String;
  };
  message?: String;
}
interface UserContextProps {
  Sign: ({name, password, email, query}: SignProps) => any;
  Logout: () => Promise<unknown>;
  user?: User;
  isRequested: boolean;
  handleFinishActivity: (activity_id: string) => Promise<void>;
  fetchActivities: () => Promise<unknown>;
  activities: ActivitiesProps[];
  handleDeleteActivity:(activity_id: string) => Promise<void>;
  handleUpdate: (...args: any) => Promise<User>;
  fetchFeedbacks: () => Promise<void>,
  feedbacks: ActivitiesProps[];
  changeFeedbackFromState: (activity: ActivitiesProps, newFeedback: boolean | undefined) => void;
  removeFeedbackFromState: (activity_id: string) => void;
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])
  const [ feedbacks, setFeedbacks ] = useState<ActivitiesProps[]>([])
  const [ isRequested, setIsRequested ] = useState(false)
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    (async () => {
      const userStore = await loadUser()
      
      console.log(userStore)
      if(JSON.stringify(userStore) !== "{}" && userStore !== undefined){
        const refreshTokenStore = await loadRefreshToken()
        setUser(userStore)
        
        if(refreshTokenStore){
          try{
            const { data } = await api.post('/refresh-token', 
              { refresh_token: refreshTokenStore.id})
            await setToken(data.token)

            if(data?.refreshToken) {
              await saveRefreshToken(data.refreshToken)
              await saveUser(userStore)
            }
          } catch(error: any) {
            console.log(error.response.data.error)
          }
        }
      }
    })()
  },[]);
  
  const fetchActivities = useCallback(async () => {
    try{
      const { data } = await api.get('/activity/get-activities')
      await saveActivities(data)
      const storedUser = await loadUser()

      storedUser && (storedUser.activities_finished_today = 0);
      setUser(storedUser)
      setActivities(data);

    } catch(error: any) {
      console.log(error.response.data)
      if(error.response.data.error === 
        "You already request the activities, try again tomorrow") {
          console.log(error.response.data.error)
          const { data } = await api.get('/activity/my-list')
          await saveActivities(data)
          setActivities(data);
        }
      }  
  },[])

  const fetchFeedbacks = useCallback(async() => {
    if(isRequested) { return }
    const { data } = await api.get('/feedback/my-list')
    setFeedbacks(data)
    setIsRequested(true)
  },[])

  async function Sign({name, email, password, query = '/login'}: SignProps) {
    const result = {} as SignResult

    try {
      const { data } = await api.post(query, { name, email, password })
      await saveRefreshToken(data.refreshToken.refreshToken)
      await setToken(data.token)
      await saveUser(data.user)
      
      result.data = data
      result.message = "ok"
      setUser(data.user)
    } catch(error: any) {
      result.message = error.response.data.error
    } finally {
      return result
    }
  }

  function Logout(){
    return new Promise((resolve) => {
      removeUser()
      removeActivity()
      removeToken()
      removeRefreshToken()
      setUser(undefined)
      setActivities([])
      setFeedbacks([])

      return resolve('ok')
    })
  }

  const handleUpdate = useCallback(async({...args}): Promise<User> => {
    let newUser: User;

    return new Promise(resolve => {
      setUser(prevUser => {
        prevUser = { ...prevUser, ...args } as User;
        newUser = prevUser;
        return newUser;
      });
      
      (async () => await saveUser(newUser))();
      return resolve(newUser)
    })
  },[])

  async function handleFinishActivity(activity_id: string){
    const newArray: ActivitiesProps[] = []
    let newUser = {} as User

    await api.delete(`/activity/finish/${activity_id}`)
    activities.forEach(item => item.id !== activity_id && newArray.push(item))
    setActivities(newArray)
    
    await saveActivities(newArray)

    const all_activities_finished = (user?.all_activities_finished || 0) + 1;
    const activities_finished_today = (user?.activities_finished_today || 0) +1;

    await handleUpdate({ all_activities_finished, activities_finished_today })
    await saveUser(newUser)
  }

  async function handleDeleteActivity(activity_id: string){
    const newArray: ActivitiesProps[] = []

    await api.delete(`/activity/my-delete/${activity_id}`)
    activities.forEach(item => item.id !== activity_id && newArray.push(item))

    setActivities(newArray)
    await saveActivities(newArray)
  }

  function changeFeedbackFromState(activity: ActivitiesProps, newFeedback: boolean | undefined){
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

    setActivities(prev => prev.map(item => {
      if(item.id === activity.id){
        item.feedback.feedback = newFeedback
      }
      return item
    }))
  }
  function removeFeedbackFromState(activity_id: string){
    setFeedbacks(prev => {
      prev.forEach((item, index) => {
        if(item.id === activity_id){
          prev.splice(index, 1)
        }
      })
      return prev
    })

    setActivities(prev => prev.map(item => {
      if(item.id === activity_id){
        item.feedback.feedback = undefined
      }
      return item
    }))
  }

  return(
    <UserContext.Provider 
      value={{
        Sign,
        Logout,
        user,
        isRequested,
        handleFinishActivity,
        fetchActivities,
        activities,
        handleDeleteActivity,
        handleUpdate,
        fetchFeedbacks,
        feedbacks,
        changeFeedbackFromState,
        removeFeedbackFromState,
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}