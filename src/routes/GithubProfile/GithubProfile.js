import React from 'react'
import { connect } from 'react-redux'

class GithubProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch(['github_profile:fetch', 'mjaneczek']);
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.props.dispatch(['github_profile:fetch', event.target.value]);
    }
  }

  handleSelectRepo(repositoryName) {
    this.props.dispatch(['readme:fetch', `${this.props.githubResponse.userName}/${repositoryName}`])
  }

  render () {
    return (
      <div>
        <div className="row">
          <p>
            <input type="text" placeholder="Github username" onKeyPress = {::this.handleFetchUser}/>
          </p>
        </div>

        { this.props.githubResponse.loading && <h1>Loading...</h1> }

        { !this.props.repos.loading && !this.props.gists.loading &&

        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item active">
                Repositories
              </a>
              {this.props.repos.map((r) => <a key={r.id} onClick={() => this.handleSelectRepo(r.name)} className="list-group-item">{r.name}</a>)}
            </div>

            <div className="list-group">
              <a href="#" className="list-group-item active">
                Gists
              </a>
              {this.props.gists.map((g) => <a key={g.id} href="#" className="list-group-item">{g.description}</a>)}
            </div>
          </div>

          <div className="col-md-9">
            { this.props.readme.loading && <h1>Loading...</h1> }

            { this.props.readme.content && <div className="well">
              {window.atob(this.props.readme.content)}
            </div> }

            { this.props.readme.error && <div className="alert alert-danger">
              {this.props.readme.error }
            </div> }
          </div>
        </div>
        }
      </div>
    )
  }
}

export default connect((state) => ({
  githubResponse: state.github_profile,
  repos: state.repos,
  gists: state.gists,
  readme: state.readme
}))(GithubProfile)
