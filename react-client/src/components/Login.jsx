import React from 'react';



class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  sendInfo(e) {
    e.preventDefault()
    let data = {
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value
    }
    this.props.sendUserInfo('/login', data)
      .then(res => {
        res && this.props.renderMain(res, document.querySelector('#username').value)
      })
  }

  render() {
    return (
      <div className="login">
        <h1 style={{ width: "100%", textAlign: "center" }}>Login</h1>
        <from className="form1">
          <input type="text" name='username' id="username" /><br />
          <input type="password" name='password' id="password" /><br />
          <button type="submit" value="Login" onClick={this.sendInfo.bind(this)}>Log In</button> <br />
          <a id='SignUp' onClick={this.props.changeDisplay}>Go to Sign Up</a>
        </from>
      </div>
    )
  }
}


export default Login;