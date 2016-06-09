import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import interactorsHash from '../interactors/index'

function conventionalReducer(name) {
 return function conventionalReducers(state = {}, action) {
   if(action.type.startsWith("CONV_REDUX/" + name)) {

     var methodName = action.type.replace('CONV_REDUX/', '').split(':').pop();
     methodName = 'on' + methodName.charAt(0).toUpperCase() + methodName.slice(1);

     var interactor = interactorsHash[name];

     if (interactor[methodName]) {
       interactor.state = interactor[methodName].apply(interactor, action.args);
     }

     return interactor.state;
   }

   return interactorsHash[name].state;
 }
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    counter: conventionalReducer('counter'),
    github_userdata: conventionalReducer('github_userdata'),
    github_repos: conventionalReducer('github_repos'),
    todo: conventionalReducer('todo'),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
