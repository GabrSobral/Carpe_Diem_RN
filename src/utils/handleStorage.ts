import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivitiesProps } from "../types/activity";
import { User } from "../types/user";

//User storage

const activityCode = "@CarpeDiem:activities"
const userCode = "@CarpeDiem:user"

export async function saveUser(user: User) {
  await AsyncStorage.setItem(userCode, JSON.stringify(user))
}
export async function loadUser(): Promise<User> {
  const data = await AsyncStorage.getItem(userCode)
  return JSON.parse(data || '') as User
}
export async function removeUser() {
  await AsyncStorage.removeItem(userCode)
}

//Activity storage

export async function saveActivity(user: User) {
  await AsyncStorage.setItem(activityCode, JSON.stringify(user))
}
export async function loadActivities(): Promise<ActivitiesProps> {
  const data = await AsyncStorage.getItem(activityCode)
  return JSON.parse(data || '') as ActivitiesProps
}
export async function removeActivity() {
  await AsyncStorage.removeItem(activityCode)
}