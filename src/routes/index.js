import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Counter from './Counter'
import ApiRequest from './GithubUserdata'
import ManyApiRequests from './GithubProfile'
import Todo from './Todo'

export default () => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Counter(),
  childRoutes: [
    Counter(),
    ApiRequest(),
    ManyApiRequests(),
    Todo()
  ]
});
