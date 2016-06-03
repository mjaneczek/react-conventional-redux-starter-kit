import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

function conventionalReducers(state = 0, action) {
  if(action.type.startsWith("CONV_REDUX/")) {
    var methodName = action.type.replace('CONV_REDUX/', '').split(':').pop();
    methodName = 'on' + methodName.charAt(0).toUpperCase() + methodName.slice(1);

    var interactor = action.interactor;
    interactor.state = state;

    if (interactor[methodName]) {
      interactor[methodName]();
    }

    return interactor.state;
  }

  return state;
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    conventionalReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
