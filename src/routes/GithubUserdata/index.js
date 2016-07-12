import {connectAllInteractors, replaceDynamicInteractors} from 'conventional-redux';
import GithubUserdata from "./GithubUserdata";
import GithubUserdataInteractor from "./GithubUserdataInteractor";

export default () => {
  return { path: 'simple_request', getComponent: (state, cb) => {
    replaceDynamicInteractors({github_userdata: new GithubUserdataInteractor()});
    cb(null, connectAllInteractors(GithubUserdata))
  }}
}
