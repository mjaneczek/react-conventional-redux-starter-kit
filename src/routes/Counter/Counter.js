import React from 'react'
import classes from './Counter.scss'
import { connect } from 'react-redux'

class Counter extends React.Component {
  render () {
    return (
      <div>
        <h2 className={classes.counterContainer}>
          Counter:
          {' '}
          <span className={classes['counter--green']}>
              {this.props.counter}
          </span>
        </h2>
        <button className='btn btn-default' onClick={() => this.props.dispatch('counter:increment')}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={() => this.props.dispatch('counter:incrementBy100')}>
          Add 100
        </button>
        {' '}
        <button className='btn btn-default' onClick={() => this.props.dispatch('counter:doubleAsync')}>
          Double (Async)
        </button>
      </div>
    )
  }
}

export default connect((state) => ({
  counter: state.counter
}))(Counter)
