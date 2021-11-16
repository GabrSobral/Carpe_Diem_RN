import React, { useCallback } from "react"
import { api } from "../../services/api"
import { ActivitiesProps } from "../../types/activity"
import { saveActivities } from "../../utils/handleStorage"
import { StateActivities } from './index'

export const handleDeleteActivity = useCallback(async (state: StateActivities, activity_id: string) => {
  const newArray: ActivitiesProps[] = []

  await api.delete(`/activity/my-delete/${activity_id}`)
  state.forEach(item => item.id !== activity_id && newArray.push(item))

  state = newArray
  await saveActivities(newArray)

  return state
},[])