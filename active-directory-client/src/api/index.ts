import * as activeDirectory from './activeDirectory'

export default {
  activeDirectory: {
    getUsers: activeDirectory.getUsers,
    signInUser: activeDirectory.signInUser
  }
}
