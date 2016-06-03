import React from 'react'
import { connect } from 'react-redux'

class ApiRequest extends React.Component {
  componentDidMount() {
    this.props.dispatch('github_userdata:fetch', 'mjaneczek')
  }

  handleFetchUser(event) {
    if (event.key === 'Enter') {
      this.props.dispatch('github_userdata:fetch', event.target.value)
    }
  }

  render () {
    return (
      <div>
        <input type="text" placeholder="Github username" onKeyPress = {::this.handleFetchUser}/>
      </div>
    )
  }
}

export default connect((state) => ({
  counter: state.conventionalReducers
}))(ApiRequest)
