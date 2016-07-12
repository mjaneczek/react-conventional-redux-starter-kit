import {replaceDynamicInteractors, connectAllInteractors} from 'conventional-redux';
import Counter from "./Counter";
import CounterInteractor from "./CounterInteractor";

export default () => {
  return { getComponent: (state, cb) => {
    replaceDynamicInteractors({counter: new CounterInteractor()});
    cb(null, connectAllInteractors(Counter))
  }}
}
