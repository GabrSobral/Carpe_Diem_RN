import React, { 
  createContext, 
  Dispatch, 
  ReactNode, 
  useContext, 
  useEffect, 
  useReducer } from "react";

import { ActivitiesProps } from "../../types/activity";
import { User } from "../../types/user";
import { AsyncLoadUser } from "./AsyncLoadUser";

import { handleUpdate } from "./handleUpdate";

interface ActivitiesProviderProps { children: ReactNode; }
interface ActivitiesContextProps {
  user: State,
  dispatch: Dispatch<Action>
}

export type StateActivities = ActivitiesProps[]
export type State = User | undefined
export type Action =
 | { type: 'Load' }
 | { type: 'Update', args: any }

const ActivitiesContext = createContext({} as ActivitiesContextProps)

function reducer(state: State, action: Action) : any {
  switch(action.type){
    case "Load": 
      async () => await AsyncLoadUser(state);
    case "Update":
      async () => await handleUpdate(state, action);
  }
}
const initialValue = { user: {} as User }

export function ActivitiesProvider({ children }: ActivitiesProviderProps){
  const [ user, dispatch ] = useReducer(reducer, initialValue)

  useEffect(() => {
    dispatch({ type: "Load" })
  },[])

  return(
    <ActivitiesContext.Provider 
      value={{
        user,
        dispatch
      }}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export function useActivities(){
  return useContext(ActivitiesContext)
}