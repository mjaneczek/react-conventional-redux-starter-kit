import React from 'react'

export default class GithubProfile extends React.Component {
  componentDidMount() {
    this.github_profile.fetch('mjaneczek');
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.github_profile.fetch(event.target.value);
    }
  }

  handleSelectRepo(repositoryName) {
    this.readme.fetch(`${this.p('github_profile.userName')}/${repositoryName}`);
  }

  render () {
    return (
      <div>
        <div className="row">
          <p>
            <input type="text" placeholder="Github username" onKeyPress = {::this.handleFetchUser}/>
          </p>
        </div>

        { this.p('github_profile.loading') && <h1>Loading...</h1> }

        { !this.p('github_profile.loading') && this.p('github_profile.error') && <h1>{this.p('github_profile.error')}</h1> }

        { !this.p('github_profile.loading') && !this.p('github_profile.error') &&

        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item active">
                Repositories
              </a>
              {this.p('repos').map((r) => <a key={r.id} onClick={() => this.handleSelectRepo(r.name)} className="list-group-item">{r.name}</a>)}
            </div>

            <div className="list-group">
              <a href="#" className="list-group-item active">
                Gists
              </a>
              {this.p('gists').map((g) => <a key={g.id} href="#" className="list-group-item">{g.description}</a>)}
            </div>
          </div>

          <div className="col-md-9">
            { this.p('readme.loading') && <h1>Loading...</h1> }

            { this.p('readme.content') && <div className="well">
              {window.atob(this.p('readme.content'))}
            </div> }

            { this.p('readme.error') && <div className="alert alert-danger">
              {this.p('readme.error') }
            </div> }
          </div>
        </div>
        }
      </div>
    )
  }
}
