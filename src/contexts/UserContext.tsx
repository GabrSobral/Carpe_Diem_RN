import React,{ useCallback } from "react";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { ActivitiesProps } from "../types/activity";
import { User } from "../types/user";
import { loadUser, removeActivity, removeUser, saveActivities, saveUser } from "../utils/handleStorage";
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
  username: String;
  Logout: () => Promise<unknown>;
  user?: User;
  handleFinishActivity: (activity_id: string) => Promise<void>;
  setHasAnswered: () => void;
  fetchActivities: () => Promise<unknown>;
  activities: ActivitiesProps[];
  handleDeleteActivity:(activity_id: string) => Promise<void>;
  handleUpdate: (...args: any) => Promise<User>
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ username, setUsername ] = useState('')
  const [ user, setUser ] = useState<User>()
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])

  useEffect(() => {
    (async () => {
      if(!await getToken()) { return }
      const userStore = await loadUser()
      if(userStore.id){
        console.log(userStore)
        setUser(userStore)
        if(userStore){
          const firstName = userStore.name.split(' ')[0]
          setUsername(firstName)
        }
      }
    })()
  },[])
  
  const fetchActivities = useCallback(() => {
    return new Promise(resolve => {
      api.get('/activity/get-activities')
      .then(({ data }) => {
        (async () => {
          await saveActivities(data)
          const storedUser = await loadUser()
          storedUser.activities_finished_today = 0;
          setUser(storedUser)
        })();
        setActivities(data);
        
        resolve('ok')
      })
      .catch((error) => {
  
        if(error.response.data.error === 
          "You already request the activities, try again tomorrow") {
            api.get('/activity/my-list')
              .then(({data}) => {
                (async () => await saveActivities(data))();
                setActivities(data);
              })
          }
      })
    })
  },[])


  async function Sign({name, email, password, query = '/login'}: SignProps) {
    const result = {} as SignResult

    try {
      const { data } = await api.post(query, { name, email, password })
      
      setToken(data.token)
      await saveUser(data.user)
      setUser(data.user)
      const firstName = data.user.name.split(' ')[0]
      setUsername(firstName)

      result.data = data
      result.message = "ok"
    } catch(error: any) {
      result.message = error.response.data.error
    } finally {
      return result
    }
  }

  function Logout(){
    return new Promise((resolve, reject) => {
      removeUser()
      removeActivity()
      removeToken()
      setUsername('')
      setUser(undefined)
      setActivities([])

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
    const activities_finished_today = (user?.activities_finished_today || 0) + 1;

    await handleUpdate({ all_activities_finished, activities_finished_today })
    await saveUser(newUser)
  }

  function setHasAnswered(){
    setUser(prev => {
      if(prev) {
        (async () => {
          prev.hasAnswered = true
          await saveUser(prev)
        })()
        return prev
      }
      return undefined
    })
  }

  async function handleDeleteActivity(activity_id: string){
    const newArray: ActivitiesProps[] = []

    await api.delete(`/activity/my-delete/${activity_id}`)
    activities.forEach(item => item.id !== activity_id && newArray.push(item))

    setActivities(newArray)
    await saveActivities(newArray)
  }

  return(
    <UserContext.Provider 
      value={{
        Sign,
        username,
        Logout,
        user,
        handleFinishActivity,
        setHasAnswered,
        fetchActivities,
        activities,
        handleDeleteActivity,
        handleUpdate
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}