export default class CounterInteractor {
  state = 0;

  doubleAsync() {
    setTimeout(() => { this.dispatch('counter:double') }, 500)
  }

  onIncrement() {
    this.state = this.state + 1;
  }

  onIncrementBy100() {
    this.state = this.state + 100;
  }

  onDouble() {
    this.state = this.state * 2;
  }
}
