import React from 'react'
import classes from './Counter.scss'

export default class Counter extends React.Component {
  render () {
    return (
      <div>
        <h2 className={classes.counterContainer}>
          Counter:
          {' '}
          <span className={classes['counter--green']}>
              {this.p('counter')}
          </span>
        </h2>
        <button className='btn btn-default' onClick={() => this.counter.increment()}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={() => this.counter.incrementBy100()}>
          Add 100
        </button>
        {' '}
        <button className='btn btn-default' onClick={() => this.counter.doubleAsync()}>
          Double (Async)
        </button>
      </div>
    )
  }
}
