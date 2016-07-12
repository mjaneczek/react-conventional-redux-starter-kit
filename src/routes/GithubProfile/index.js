import {replaceDynamicInteractors, connectAllInteractors} from 'conventional-redux';
import GithubProfile from "./GithubProfile";
import GithubProfileInteractor from "./GithubProfileInteractor";
import ResourceInteractor from "../../services/resourceInteractor";

export default () => {
  return { path: 'many_requests', getComponent: (state, cb) => {
    replaceDynamicInteractors({
      repos: new ResourceInteractor('https://api.github.com/users/{}/repos', []),
      gists: new ResourceInteractor('https://api.github.com/users/{}/gists', []),
      readme: new ResourceInteractor('https://api.github.com/repos/{}/readme'),
      github_profile: new GithubProfileInteractor()
    });

    cb(null, connectAllInteractors(GithubProfile))
  }}
}
