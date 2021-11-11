import api from './api'

export default {
  activeDirectory: {
    users: {
      getUsers: api.getUsers,
      addUser: api.addUser,
      updateUsers: api.updateUsers,
      deleteUser: api.deleteUser,
    },
    auth: {
      login: api.login,
    },
  },
}
