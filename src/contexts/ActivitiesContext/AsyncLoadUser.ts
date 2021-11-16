import { api } from "../../services/api"
import { loadRefreshToken, loadUser, saveRefreshToken, saveUser } from "../../utils/handleStorage"
import { setToken } from "../../utils/handleToken"
import { State } from './index'

export async function AsyncLoadUser(state: State) {
  const userStore = await loadUser()
      
  if(JSON.stringify(userStore) !== "{}" && userStore !== undefined){
    const refreshTokenStore = await loadRefreshToken()
    state = userStore
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
    state = undefined

  return state
}