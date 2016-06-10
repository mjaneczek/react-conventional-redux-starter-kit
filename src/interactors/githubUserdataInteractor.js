import { fetchResource } from '../services/api'

export default class GithubUserdataInteractor {
  state = {};

  fetch(userName) {
    fetchResource('https://api.github.com/users/' + userName)
    .then((data) => {
      this.dispatch(['github_userdata:fetchSuccess', data])
    }).catch((error) => {
      this.dispatch(['github_userdata:fetchError', error])
    })
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
