import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Counter from './Counter'
import ApiRequest from './GithubUserdata'
import ManyApiRequests from './GithubProfile'
import Todo from './Todo'

export default () => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(),
  childRoutes: [
    Counter(),
    ApiRequest(),
    ManyApiRequests(),
    Todo()
  ]
});
