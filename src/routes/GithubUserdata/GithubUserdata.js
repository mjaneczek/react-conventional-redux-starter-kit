import React from 'react'
import { connect } from 'react-redux'

class GithubUserdata extends React.Component {
  componentDidMount() {
    this.props.dispatch(['github_userdata:fetch', 'mjaneczek'])
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.props.dispatch(['github_userdata:fetch', event.target.value])
    }
  }

  render () {
    return (
      <div>
        <p>
          <input type="text" placeholder="Github username" onKeyPress = {::this.handleFetchUser}/>
        </p>

        { this.props.githubResponse.user && <div className="well">
          {JSON.stringify(this.props.githubResponse.user, null, 2)}
        </div> }

        { this.props.githubResponse.error && <div className="alert alert-danger">
          {this.props.githubResponse.error }
        </div> }

        { this.props.githubResponse.loading && <h1>Loading...</h1> }
      </div>
    )
  }
}

export default connect((state) => ({
  githubResponse: state.github_userdata
}))(GithubUserdata)
