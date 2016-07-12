import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>React Conventional Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Counter
    </IndexLink>
    {' · '}
    <Link to='/simple_request' activeClassName={classes.activeRoute}>
      API request
    </Link>
    {' · '}
    <Link to='/many_requests' activeClassName={classes.activeRoute}>
      Many API requests
    </Link>
    {' · '}
    <Link to='/todo' activeClassName={classes.activeRoute}>
      Todolist
    </Link>
  </div>
)

export default Header
