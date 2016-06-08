import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
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

class CounterInteractor {
  state = 0;

  doubleAsync() {
    setTimeout(() => { this.dispatch('counter:double') }, 500)
  }

  onIncrement() {
    this.state = this.state + 1;
  }

  onIncrementBy100() {
    this.state = this.state + 100;
  }

  onDouble() {
    this.state = this.state * 2;
  }
}

class GithubUserdataInteractor {
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
    this.state = { loading: true }
  }

  onFetchSuccess(userData) {
    this.state = { user: userData }
  }

  onFetchError(error) {
    this.state = { error: error.message }
  }
}

class GithubReposInteractor {
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
    this.state = { loading: true, user: [], gists: [], readme: 'Loading...'}
  }

  onFetchReposSuccess(userData) {
    this.state = { user: userData, gists: this.state.gists, readme: this.state.readme }
  }

  onFetchReposError(error) {
    this.state = { error: error.message }
  }

  onFetchGistsSuccess(gistData) {
    this.state = { user: this.state.user, gists: gistData, readme: this.state.readme }
  }

  onFetchGistsError(error) {
    this.state = { error: error.message }
  }

  onFetchReadme(repoName) {
    this.state = { user: this.state.user, gists: this.state.gists, readme: `Loading ${repoName}...`}
  }

  onFetchReadmeSuccess(data) {
    this.state = { user: this.state.user, gists: this.state.gists, readme: window.atob(data.content)}
  }

  onDone(data) {
    console.log(data);
  }
}

class TodoInteractor {
  state = { todos: [] };

  onAdd(text) {
    var existing_todos = this.state.todos || [];
    this.state = { todos: existing_todos.concat([text]) }
  }

  onEdit(id) {
    this.state = { todos: this.state.todos, edit: id}
  }

  onEditSuccess(newValue) {
    this.state.todos[this.state.edit] = newValue;
    this.state = { todos: this.state.todos.slice(), edit: null}
  }

  onDelete(id) {
    this.state.todos.splice(id, 1);
    this.state = { todos: this.state.todos.slice() }
  }
}

var symbolHash = {
  'counter': CounterInteractor,
  'github_userdata': GithubUserdataInteractor,
  'github_repos': GithubReposInteractor,
  'todo': TodoInteractor
};

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const conventionalReduxMiddleware = store => next => action => {
    if (typeof action === 'string' || action instanceof String || action instanceof Array) {
      var interactorSymbol, methodName, actionName, args;

      if(action instanceof Array) {
        actionName = action[0];
        args = action.slice(1);
        [interactorSymbol, methodName] = action[0].replace('CONV_REDUX/', '').split(':');
      } else {
        actionName = action;
        args = null;
        [interactorSymbol, methodName] = action.replace('CONV_REDUX/', '').split(':');
      }

      var interactor = new symbolHash[interactorSymbol]();
      interactor.dispatch = store.dispatch;

      if(interactor[methodName]) {
        interactor[methodName].apply(interactor, args)
      }

      return next({type: 'CONV_REDUX/' + actionName, interactor: interactor, args: args})
    } else {
      return next(action)
    }
  };

  const middleware = [conventionalReduxMiddleware, thunk, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers)
    })
  }

  return store
}
