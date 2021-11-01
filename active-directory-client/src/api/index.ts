import api from './api'

export default {
  activeDirectory: {
    users: {
      getUsers: api.getUsers,
      updateUsers: api.updateUsers,
      deleteUser: api.deleteUser,
    },
    auth: {
      loginUser: api.loginUser,
    },
  },
}
