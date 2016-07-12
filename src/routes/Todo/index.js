import {connectAllInteractors, replaceDynamicInteractors} from 'conventional-redux';
import Todo from "./Todo";
import TodoInteractor from "./TodoInteractor";

export default () => {
  return { path: 'todo', getComponent: (state, cb) => {
    replaceDynamicInteractors({todo: new TodoInteractor()});
    cb(null, connectAllInteractors(Todo))
  }}
}
