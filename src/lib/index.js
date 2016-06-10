export { conventionalReduxMiddleware } from './middleware';
export { conventionalReducers } from './reducer';

export var interactors = {};

export function registerInteractors(hash) {
  interactors = hash;
}

export function registerInteractor(key, interactor) {
  interactors[key] = interactor;
}
