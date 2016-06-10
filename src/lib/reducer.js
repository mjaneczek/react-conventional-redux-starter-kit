import { interactors } from '../lib/index'

export function conventionalReducer(name) {
  return function conventionalReducers(state = {}, action) {
    if(action.type.startsWith("CONV_REDUX/" + name)) {

      var methodName = action.type.replace('CONV_REDUX/', '').split(':').pop();
      methodName = 'on' + methodName.charAt(0).toUpperCase() + methodName.slice(1);

      var interactor = interactors[name];

      if (interactor[methodName]) {
        interactor.state = interactor[methodName].apply(interactor, action.args);
      }

      return interactor.state;
    }
    
    return interactors[name].state;
  }
}

export function conventionalReducers() {
  var conventionalReducersHash = {};

  for (const name in interactors){
    conventionalReducersHash[name] = conventionalReducer(name);
  }

  return conventionalReducersHash;
}
