import { useCallback } from "react";
import { State } from "./index";
import { User } from "../../types/user";
import { saveUser } from "../../utils/handleStorage";

export const handleUpdate = useCallback(async(state: State, {...args}): Promise<State> => {
  state = { ...state, ...args }
  
  await saveUser(state as User);
  return state
},[saveUser])