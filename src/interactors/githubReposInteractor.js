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

export default class GithubReposInteractor {
  state = {};

  fetch(userName) {
    Promise.all([

      fetch('https://api.github.com/users/' + userName + '/repos')
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        this.dispatch(['github_repos:fetchReposSuccess', data])
        this.dispatch(['github_repos:fetchReadme', data[0].name])
      }).catch((error) => {
        this.dispatch(['github_repos:fetchReposError', error])
      }),

      fetch('https://api.github.com/users/' + userName + '/gists')
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        this.dispatch(['github_repos:fetchGistsSuccess', data])
      }).catch((error) => {
        this.dispatch(['github_repos:fetchGistsError', error])
      })

    ]).then((data) => {
      this.dispatch(['github_repos:done', data])
    })
  }

  fetchReadme(repoName) {
    fetch('https://api.github.com/repos/mjaneczek/' + repoName + '/readme')
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      this.dispatch(['github_repos:fetchReadmeSuccess', data])
    }).catch((error) => {
      this.dispatch(['github_repos:fetchReadmeError', error])
    })
  }

  onFetch() {
    this.state = {loading: true, user: [], gists: [], readme: 'Loading...'}
  }

  onFetchReposSuccess(userData) {
    this.state = {user: userData, gists: this.state.gists, readme: this.state.readme}
  }

  onFetchReposError(error) {
    this.state = {error: error.message}
  }

  onFetchGistsSuccess(gistData) {
    this.state = {user: this.state.user, gists: gistData, readme: this.state.readme}
  }

  onFetchGistsError(error) {
    this.state = {error: error.message}
  }

  onFetchReadme(repoName) {
    this.state = {user: this.state.user, gists: this.state.gists, readme: `Loading ${repoName}...`}
  }

  onFetchReadmeSuccess(data) {
    this.state = {user: this.state.user, gists: this.state.gists, readme: window.atob(data.content)}
  }

  onDone(data) {
    console.log(data);
  }
}
