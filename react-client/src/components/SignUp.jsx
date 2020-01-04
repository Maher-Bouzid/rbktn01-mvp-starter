import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }

  sendInfo(e) {
    e.preventDefault()
    let data = {
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value
    }
    this.props.sendUserInfo('/signup', data)
      .then(res => {
        console.log(res)
        res && this.props.renderMain(res, document.querySelector('#username').value)
      })
  }

  render() {
    return (
      <div className="login">
        <h1 style={{ width: "100%", textAlign: "center" }}>Sign Up</h1>
        <from className="form1">
          <input type="text" name='username' id="username" /><br />
          <input type="password" name='password' id="password" /><br />
          <button type="submit" value="Sign Up" onClick={this.sendInfo.bind(this)}>Sign Up</button><br />
          <a id='Login' onClick={this.props.changeDisplay}>Go to Login</a>
        </from>
      </div>
    )
  }
}


export default SignUp;