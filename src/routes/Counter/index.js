import {registerInteractor} from '../../lib';
import Counter from "./Counter";
import CounterInteractor from "./CounterInteractor";

export default () => {
  registerInteractor('counter', new CounterInteractor());
  return { path: 'counter', component: Counter }
}
