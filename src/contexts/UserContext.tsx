import React,{ useCallback, createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/user";
import { loadRefreshToken, loadUser, removeActivity, removeRefreshToken, removeUser, saveActivities, saveRefreshToken, saveUser } from "../utils/handleStorage";
import { removeToken, setToken } from "../utils/handleToken";

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
  handleUpdate: (...args: any) => Promise<User>;
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ user, setUser ] = useState<User | undefined>(undefined)

  const loadUserWithRefreshToken = useCallback(async () => {
    const userStore = await loadUser()
      
    if(JSON.stringify(userStore) !== "{}" && userStore !== undefined){
      const refreshTokenStore = await loadRefreshToken()
      setUser(userStore)
      if(refreshTokenStore) {
        try{
          const { data } = await api.post('/refresh-token', { refresh_token: refreshTokenStore.id})
          await setToken(data.token)

          if(data?.refreshToken) {
            await saveRefreshToken(data.refreshToken)
            await saveUser(userStore)
          }
        } catch(error: any) {
          console.log(error.response.data.error)
        }
      }
    } else
      setUser(undefined)

  },[loadUser, saveRefreshToken, saveUser, loadRefreshToken])

  useEffect(() => {
    console.log(user)
  },[user])

  useEffect(() => {
    (async () => {
      await loadUserWithRefreshToken()
    })()
  },[loadUserWithRefreshToken]);

  const Sign = useCallback(async ({name, email, password, query = '/login'}: SignProps) => {
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
  },[saveUser, setToken, saveRefreshToken])

  const Logout = useCallback(() => {
    return new Promise((resolve) => {
      removeUser()
      removeActivity()
      removeToken()
      removeRefreshToken()
      setUser(undefined)

      return resolve('ok')
    })
  },[])

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
  },[saveUser])

  return(
    <UserContext.Provider 
      value={{
        Sign,
        Logout,
        user,
        handleUpdate
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}