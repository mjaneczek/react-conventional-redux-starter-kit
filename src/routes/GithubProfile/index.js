import {registerInteractors} from '../../lib';
import GithubProfile from "./GithubProfile";
import GithubProfileInteractor from "./GithubProfileInteractor";
import ResourceInteractor from "../../services/resourceInteractor";

export default () => {
  registerInteractors({
    'repos': new ResourceInteractor('https://api.github.com/users/{}/repos', []),
    'gists': new ResourceInteractor('https://api.github.com/users/{}/gists', []),
    'readme': new ResourceInteractor('https://api.github.com/repos/{}/readme'),
    'github_profile': new GithubProfileInteractor()
  });

  return { path: 'many_requests', component: GithubProfile }
}
