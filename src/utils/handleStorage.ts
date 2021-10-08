import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivitiesProps } from "../types/activity";
import { RefreshToken, User } from "../types/user";

//User storage

const activityCode = "@CarpeDiem:activities"
const userCode = "@CarpeDiem:user"
const refreshTokenCode = "@CarpeDiem:refresh_token"

export async function saveUser(user: User) {
  await AsyncStorage.setItem(userCode, JSON.stringify(user))
}
export async function loadUser(): Promise<User | undefined> {
  const data = await AsyncStorage.getItem(userCode)
  if(data === null){ return undefined }
  return JSON.parse(data || '') as User
}
export async function removeUser() {
  await AsyncStorage.removeItem(userCode)
}

//Activity storage

export async function saveActivities(activities: ActivitiesProps[]) {
  await AsyncStorage.setItem(activityCode, JSON.stringify(activities))
}
export async function loadActivities(): Promise<ActivitiesProps> {
  const data = await AsyncStorage.getItem(activityCode)
  return JSON.parse(data || '') as ActivitiesProps
}
export async function removeActivity() {
  await AsyncStorage.removeItem(activityCode)
}

//Refresh Token storage

export async function saveRefreshToken(refreshToken: ActivitiesProps[]) {
  await AsyncStorage.setItem(refreshTokenCode, JSON.stringify(refreshToken))
}
export async function loadRefreshToken(): Promise<RefreshToken> {
  const data = await AsyncStorage.getItem(refreshTokenCode)
  return JSON.parse(data || '') as RefreshToken
}
export async function removeRefreshToken() {
  await AsyncStorage.removeItem(refreshTokenCode)
}