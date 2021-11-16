import React, { useCallback } from "react";
import { StateActivities, useActivities } from ".";
import { api } from "../../services/api";
import { loadUser, saveActivities } from "../../utils/handleStorage";

export const fetchActivities = useCallback(async (state: StateActivities) => {
  const { dispatch } = useActivities()

  try{
    const { data } = await api.get('/activity/get-activities')
    await saveActivities(data)
    const storedUser = await loadUser()

    storedUser && (storedUser.activities_finished_today = 0);
    dispatch({ type:  })
    setUser(storedUser)
    state = data;

  } catch(error: any) {
    console.log(error.response.data)
    if(error.response.data.error === 
      "You already request the activities, try again tomorrow") {
        console.log(error.response.data.error)
        const { data } = await api.get('/activity/my-list')
        await saveActivities(data)
        state = data;
      }
  }  
},[saveActivities, loadUser])