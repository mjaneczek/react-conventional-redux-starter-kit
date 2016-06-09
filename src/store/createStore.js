import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import interactorsHash from '../interactors/index'

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

      var interactor = interactorsHash[interactorSymbol];
      interactor.dispatch = store.dispatch;

      if(interactor[methodName]) {
        interactor[methodName].apply(interactor, args)
      }

      return next({type: 'CONV_REDUX/' + actionName, args: args})
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
