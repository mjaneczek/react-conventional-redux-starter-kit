import CounterInteractor from "./counterInteractor";
import GithubUserdataInteractor from "./githubUserdataInteractor";
import GithubReposInteractor from "./githubReposInteractor";
import TodoInteractor from "./todoInteractor";

export default {
  'counter': new CounterInteractor(),
  'github_userdata': new GithubUserdataInteractor(),
  'github_repos': new GithubReposInteractor(),
  'todo': new TodoInteractor()
}
