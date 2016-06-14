import {registerInteractor} from '../../lib';
import Todo from "./Todo";
import TodoInteractor from "./TodoInteractor";

export default () => {
  registerInteractor('todo', new TodoInteractor());
  return { path: 'todo', component: Todo }
}
