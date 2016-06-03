import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

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

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const conventionalReduxMiddleware = store => next => action => {
    if (typeof action === 'string' || action instanceof String) {
      var interactor = new CounterInteractor();
      interactor.dispatch = store.dispatch;

      var methodName = action.split(':').pop();

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
