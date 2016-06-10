import { fetchResource } from '../services/api'

export default class GithubReposInteractor {
  state = {};

  fetch(userName) {
    Promise.all([

      fetchResource('https://api.github.com/users/' + userName + '/repos')
      .then((data) => {
        this.dispatch(['github_repos:fetchReposSuccess', data])
        this.dispatch(['github_repos:fetchReadme', data[0].name])
      }).catch((error) => {
        this.dispatch(['github_repos:fetchReposError', error])
      }),

      fetchResource('https://api.github.com/users/' + userName + '/gists')
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
    fetchResource('https://api.github.com/repos/mjaneczek/' + repoName + '/readme')
    .then((data) => {
      this.dispatch(['github_repos:fetchReadmeSuccess', data])
    }).catch((error) => {
      this.dispatch(['github_repos:fetchReadmeError', error])
    })
  }

  onFetch() {
    return {loading: true, user: [], gists: [], readme: 'Loading...'}
  }

  onFetchReposSuccess(userData) {
    return {user: userData, gists: this.state.gists, readme: this.state.readme}
  }

  onFetchReposError(error) {
    return {error: error.message}
  }

  onFetchGistsSuccess(gistData) {
    return {user: this.state.user, gists: gistData, readme: this.state.readme}
  }

  onFetchGistsError(error) {
    return {error: error.message}
  }

  onFetchReadme(repoName) {
    return {user: this.state.user, gists: this.state.gists, readme: `Loading ${repoName}...`}
  }

  onFetchReadmeSuccess(data) {
    return {user: this.state.user, gists: this.state.gists, readme: window.atob(data.content)}
  }

  onDone(data) {
    return this.state;
  }
}
