import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Counter from './Counter/Counter'
import ApiRequest from './ApiRequest/ApiRequest'

export default (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    { path: 'counter', component: Counter},
    { path: 'simple_request', component: ApiRequest }
  ]
});
