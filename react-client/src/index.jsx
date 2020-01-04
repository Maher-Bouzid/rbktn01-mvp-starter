import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      display: 'Login',
      username: ""
    }

  }
  changeDisplay(e) {
    this.setState({ display: e.target.id })
  }
  renderMain(state, username) {
    this.setState({
      display: state,
      username: username
    })
  }
  sendUserInfo(url, obj) {
    return $.post(url, obj)
  }

  render() {
    return (
      <div>
        {
          this.state.display === 'Login' ? <Login changeDisplay={this.changeDisplay.bind(this)} sendUserInfo={this.sendUserInfo.bind(this)} renderMain={this.renderMain.bind(this)} /> :
            this.state.display === 'SignUp' ? <SignUp changeDisplay={this.changeDisplay.bind(this)} sendUserInfo={this.sendUserInfo.bind(this)} renderMain={this.renderMain.bind(this)} /> :
              <List username={this.state.username} />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));