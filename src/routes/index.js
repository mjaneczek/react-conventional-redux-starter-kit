import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Counter from './Counter/Counter'
import ApiRequest from './ApiRequest/ApiRequest'
import ManyApiRequests from './ManyApiRequests/ManyApiRequests'

export default (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    { path: 'counter', component: Counter},
    { path: 'simple_request', component: ApiRequest },
    { path: 'many_requests', component: ManyApiRequests }
  ]
});
