import 'whatwg-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default class GithubUserdataInteractor {
  state = {};

  fetch(userName) {
    fetch('https://api.github.com/users/' + userName)
    .then(checkStatus)
    .then(parseJSON)
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
