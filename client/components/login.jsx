import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'root',
      password: 'root'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row container login">
        <form className="col s12 blue lighten-4">
          <div className="row">
            <div className="col s12">
              <h1 className="center">Login</h1>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 offset-s3">
              <input name="userName" id="username" type="text" className="validate" onChange={this.handleChange} value={this.state.userName}></input>
              <label htmlFor="username">User Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 offset-s3">
              <input name='password' id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.password}></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center">
              <button href="#" className="btn" onClick={this.handleSubmit}>Login</button>
            </div>
          </div>
        </form>
      </div>

    );
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {};
    const request = '/api/login';
    formData.userName = this.state.userName;
    formData.password = this.state.password;
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    fetch(request, settings)
      .then(res => res.json())
      .then(data => {

      })
      .catch(err => console.error('Fetch failed!', err));
    this.props.login(`uname: ${formData.userName} pword: ${formData.password}`);
  }
}
