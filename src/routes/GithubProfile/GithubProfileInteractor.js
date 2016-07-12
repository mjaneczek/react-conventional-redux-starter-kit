export default class GithubProfileInteractor {
  state = {};

  fetch(userName) {
    return Promise.all([
      this.dispatch(['repos:fetch', userName]).then(repos => {
        this.dispatch(['readme:fetch', `${userName}/${repos[0].name}`])
      }),

      this.dispatch(['gists:fetch', userName])
    ]);
  }

  onFetch(userName) {
    return { loading: true, userName: userName }
  }

  onFetchSuccess(response) {
    return { ...this.state, loading: false }
  }

  onFetchError(response) {
    return { ...this.state, loading: false, error: response.message}
  }
}
