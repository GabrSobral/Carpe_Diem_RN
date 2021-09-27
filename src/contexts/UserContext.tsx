import React,{ useCallback } from "react";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/user";
import { loadUser, removeActivity, removeUser, saveUser } from "../utils/handleStorage";
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
  handleFinishActivityInUser: () => void;
  setHasAnswered: () => void;
  // updateUserState: () => void;
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ username, setUsername ] = useState('')
  const [ user, setUser ] = useState<User>()

  const updateUserState = useCallback(async () => {
    const userStore = await loadUser()
    if(userStore){
      setUser(userStore)
      if(userStore){
        const firstName = userStore.name.split(' ')[0]

        console.log(firstName)
        setUsername(firstName)
      }
    }
  },[])

  useEffect(() => {
    (async () => {
      if(getToken()) {
        updateUserState()
      }
    })()
  },[ updateUserState ])


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

      return resolve('ok')
    })
  }

  async function handleFinishActivityInUser(){
    setUser(prev => {
      if(prev){
        prev.all_activities_finished++
        prev.activities_finished_today++

        (async () => {
          await saveUser(prev)
        })()

        return prev
      }
      return undefined
    })
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

  return(
    <UserContext.Provider 
      value={{
        Sign,
        username,
        Logout,
        user,
        handleFinishActivityInUser,
        setHasAnswered,
        // updateUserState
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}