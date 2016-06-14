export default class GithubProfileInteractor {
  state = {};

  fetch(userName) {
    return Promise.all([
      this.dispatch(['repos:fetch', userName]).then(repos => {
        this.dispatch(['readme:fetch', userName, repos[0].name])
      }),

      this.dispatch(['gists:fetch', userName])
    ]);
  }

  onFetch(userName) {
    return { loading: true, userName: userName }
  }

  onFetchSuccess(response) {
    return { loading: false, userName: this.state.userName }
  }
}
