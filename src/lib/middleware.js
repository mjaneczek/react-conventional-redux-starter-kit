import { interactors } from './index';

export const conventionalReduxMiddleware = store => next => action => {
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

    var interactor = interactors[interactorSymbol];
    interactor.dispatch = store.dispatch;

    if(interactor[methodName]) {
      var result = interactor[methodName].apply(interactor, args)

      if (result && 'function' === typeof result.then) {
        result.then((data) => {
          store.dispatch([interactorSymbol + ':' + methodName + 'Success', data])
        }).catch((error) => {
          store.dispatch([interactorSymbol + ':' + methodName + 'Error', error])
        })
      }
    }

    return next({type: 'CONV_REDUX/' + actionName, args: args})
  } else {
    return next(action)
  }
};
