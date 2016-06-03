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
    fetch('https://api.github.com/users/mjaneczek')
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      this.dispatch('github_userdata:fetchSuccess')
    }).catch((error) => {
      this.dispatch('github_userdata:fetchError')
    })
  }

  onFetch() {
    console.log('on fetch');
  }

  onFetchSuccess() {
    alert('done!');
  }

  onFetchError() {
    alert('error');
  }
}

var symbolHash = {
  'counter': CounterInteractor,
  'github_userdata': GithubUserdataInteractor,
};

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const conventionalReduxMiddleware = store => next => action => {
    if (typeof action === 'string' || action instanceof String) {
      var [interactorSymbol, methodName] = action.replace('CONV_REDUX/', '').split(':');

      var interactor = new symbolHash[interactorSymbol]();
      interactor.dispatch = store.dispatch;

      if(interactor[methodName]) {
        interactor[methodName]();
      }

      return next({type: 'CONV_REDUX/' + action, interactor: interactor})
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
