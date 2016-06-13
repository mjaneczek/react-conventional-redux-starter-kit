import React from 'react'
import { connect } from 'react-redux'

class ManyApiRequests extends React.Component {
  componentDidMount() {
    this.props.dispatch(['github_repos:fetch', 'mjaneczek']);
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.props.dispatch(['github_repos:fetch', event.target.value]);
    }
  }

  handleSelectRepo(repositoryName) {
    this.props.dispatch(['readme:fetch', this.props.githubResponse.userName, repositoryName])
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

        { this.props.repos && this.props.gists && this.props.repos.map && this.props.gists.map &&

        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item active">
                Repositories
              </a>
              {this.props.repos.map((r) => <a onClick={() => this.handleSelectRepo(r.name)} className="list-group-item">{r.name}</a>)}
            </div>

            <div className="list-group">
              <a href="#" className="list-group-item active">
                Gists
              </a>
              {this.props.gists.map((g) => <a href="#" className="list-group-item">{g.description}</a>)}
            </div>
          </div>

          <div className="col-md-9">
            { this.props.readme.name && <div className="well">
              {window.atob(this.props.readme.content)}
            </div> }

            { this.props.githubResponse.error && <div className="alert alert-danger">
              {this.props.githubResponse.error }
            </div> }
          </div>
        </div>
        }
      </div>
    )
  }
}

export default connect((state) => ({
  githubResponse: state.github_repos,
  repos: state.repos,
  gists: state.gists,
  readme: state.readme
}))(ManyApiRequests)
