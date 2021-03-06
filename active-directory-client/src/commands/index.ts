import * as actions from '../store/actions'
// import api from '../api/'
import { UserSignInParams, } from '../api/api'

export function signInUser (userSignInParams: UserSignInParams) {
  return async (dispatch: any) => {
    try {
      dispatch(actions.setUserAuthenticated())
      // const response = await api.activeDirectory.signInUser(userSignInParams)
      // if (response.ok) { dispatch(actions.setUserAuthenticated()) } else { dispatch(actions.setError(await response.json())) }
    } catch (e) {
      dispatch(actions.setError(e))
    }
  }
}
