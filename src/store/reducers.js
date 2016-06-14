import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { conventionalReducers } from 'conventional-redux';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    ...conventionalReducers(),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
