export default class CounterInteractor {
  state = 0;

  doubleAsync() {
    setTimeout(() => { this.dispatch('counter:double') }, 500)
  }

  onIncrement() {
    return this.state + 1;
  }

  onIncrementBy100() {
    return this.state + 100;
  }

  onDouble() {
    return this.state * 2;
  }
}
