import { makeAutoObservable, } from 'mobx'
import { createContext, } from 'react'
import api from '../api'
import { User, Users, } from '../types/types.users'

class UserStore {
  users: Users = {};
  isUpdating: boolean = true;

  constructor () {
    makeAutoObservable(this)
  }

  getUsers = () => {
    return this.users
  }

  getUpdateStatus = () => this.isUpdating

  updateUser = async (user: User) => {
    this.users[user.dn] = user
    await api.activeDirectory.users.updateUsers({ users: this.users, })
    const response = await api.activeDirectory.users.getUsers()
    await this.setUsers(response.users)
    console.log(this.users)
  }

  fetchUserData = async () => {
    try {
      this.isUpdating = true
      const response = await api.activeDirectory.users.getUsers()
      this.setUsers(response.users ?? [])
      this.isUpdating = false
    } catch (e) {
      console.log(e)
    }
  };

  setUsers = async (users: Users) => {
    try {
      this.users = users
    } catch (e) {
      console.log(e)
    }
  };

  deleteUser = async (user: User) => {
    try {
      await api.activeDirectory.users.deleteUser({ user: user, })
      await this.fetchUserData()
    } catch (e) {
      console.log(e)
    }
  }
}

export const userStore = new UserStore()
export default createContext(userStore)
