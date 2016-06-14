import {registerInteractor} from 'conventional-redux';
import GithubUserdata from "./GithubUserdata";
import GithubUserdataInteractor from "./GithubUserdataInteractor";

export default () => {
  registerInteractor('github_userdata', new GithubUserdataInteractor());
  return { path: 'simple_request', component: GithubUserdata }
}
