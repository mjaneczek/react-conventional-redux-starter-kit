import CounterInteractor from "./counterInteractor";
import GithubUserdataInteractor from "./githubUserdataInteractor";
import GithubReposInteractor from "./githubReposInteractor";
import TodoInteractor from "./todoInteractor";
import ResourceInteractor from "./resourceInteractor";

export default {
  'counter': new CounterInteractor(),
  'github_userdata': new GithubUserdataInteractor(),

  'repos': new ResourceInteractor('https://api.github.com/users/{0}/repos'),
  'gists': new ResourceInteractor('https://api.github.com/users/{0}/gists'),
  'readme': new ResourceInteractor('https://api.github.com/repos/{0}/{1}/readme'),

  'github_repos': new GithubReposInteractor(),

  'todo': new TodoInteractor()
}
