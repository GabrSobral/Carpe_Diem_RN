import AsyncStorage from '@react-native-async-storage/async-storage'

const token_name = "@CarpeDiem_TOKEN"

export async function getToken(){
  return await AsyncStorage.getItem(token_name) 
}
export async function setToken(token: string){
  await AsyncStorage.setItem(token_name, token)
}
export async function removeToken(){
  await AsyncStorage.removeItem(token_name)
}