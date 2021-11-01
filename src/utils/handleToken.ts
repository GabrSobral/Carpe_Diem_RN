import AsyncStorage from '@react-native-async-storage/async-storage'

const token_name = "@CarpeDiem_TOKEN"
// const email_name = "@CarpeDiem_TOKEN"
// const code_name = "@CarpeDiem_TOKEN"

// token
export async function getToken(){
  return await AsyncStorage.getItem(token_name) 
}
export async function setToken(token: string){
  await AsyncStorage.setItem(token_name, token)
}
export async function removeToken(){
  await AsyncStorage.removeItem(token_name)
}

// // email
// export async function setEmail(item: any){
//   await AsyncStorage.setItem(email_name, JSON.stringify(item))
// }
// export async function removeEmail(){
//   await AsyncStorage.removeItem(email_name)
// }
// export async function getEmail(){
//   const email = await AsyncStorage.getItem(email_name)
//   return JSON.parse(email || '')
// }

// // code
// export async function setCode(item: any){
//   await AsyncStorage.setItem(code_name, JSON.stringify(item))
// }
// export async function removeCode(){
//   await AsyncStorage.removeItem(code_name)
// }
// export async function getCode(){
//   const code = await AsyncStorage.getItem(code_name)
//   return JSON.parse(code || '')
// }