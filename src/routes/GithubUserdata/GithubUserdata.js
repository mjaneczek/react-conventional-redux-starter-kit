import React from 'react'

export default class GithubUserdata extends React.Component {
  componentDidMount() {
    this.github_userdata.fetch('mjaneczek');
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.github_userdata.fetch(event.target.value);
    }
  }

  render () {
    return (
      <div>
        <p>
          <input type="text" placeholder="Github username" onKeyPress = {::this.handleFetchUser}/>
        </p>

        { this.p('github_userdata.loading') && <h1>Loading...</h1> }

        { this.p('github_userdata.user') && <div className="well">
          {JSON.stringify(this.p('github_userdata.user'), null, 2)}
        </div> }

        { this.p('github_userdata.error') && <div className="alert alert-danger">
          {this.p('github_userdata.error') }
        </div> }
      </div>
    )
  }
}
