import { fetchResource } from '../services/api'

export default class GithubUserdataInteractor {
  state = {};

  fetch(userName) {
    return fetchResource('https://api.github.com/users/' + userName)
  }

  onFetch() {
    return { loading: true }
  }

  onFetchSuccess(userData) {
    return { user: userData }
  }

  onFetchError(error) {
    return { error: error.message }
  }
}
