import { makeAutoObservable, } from 'mobx'
import { createContext, } from 'react'
import api from '../api'
import { LoginPayload, } from '../api/api'
import { CredentialsPayload, } from '../api/api.login.types'
import { User, Users, } from '../types/types.users'

class AuthStore {
  isAuthenticated: boolean = false;

  constructor () {
    makeAutoObservable(this)
  }

  login = async (credentials: CredentialsPayload) => {
    const response = await api.activeDirectory.auth.login(credentials as LoginPayload)

    if (response.status === 202) { this.setAuthenticated(true) } else this.setAuthenticated(false)
  }

  setAuthenticated = (status: boolean) => {
    this.isAuthenticated = status
    console.log(this.isAuthenticated)
  }
}
export const authStore = new AuthStore()
export default createContext(authStore)
