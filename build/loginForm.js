'use strict';

var LoginForm = React.createClass({
  displayName: 'LoginForm',

  getInitialState: function getInitialState() {
    return {
      counter: 0
    };
  },
  increment: function increment() {
    this.setState({ counter: this.state.counter + 1 });
  },
  processLogin: function processLogin() {
    //NOTE: currently server-side ip blocking is not set up for users hitting the account login attempts limit
    if (this.state.counter === 10) {
      alert('Too many login attempts. Your account has been suspended please contact support.');
      //DEBUG: set a cookie here to see if user is locked out
      return;
    };
    var username = this.refs.username.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    //store ls cookie to allow admin to re-login after new user sign up as parse will auto-login as new user
    localStorage.setItem('data', JSON.stringify({ pass: pass, username: username }));
    Parse.User.logIn(username, pass, {
      success: (function (login) {
        this.props.filter({ loggedIn: true });
      }).bind(this),
      error: (function (error) {
        alert('Invalid Login');
        $('#username').val('');
        $('#pass').val('');
        $('#login').blur();
        this.props.filter({ loggedIn: false });
      }).bind(this)
    });
    return false;
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { onSubmit: this.processLogin },
        React.createElement(
          'div',
          { className: 'center-400w' },
          React.createElement(
            'h5',
            { className: 'left-margin-100' },
            'Login'
          ),
          React.createElement('input', { type: 'text',
            placeholder: 'Enter your username',
            id: 'username',
            ref: 'username',
            className: 'form-control input-margin',
            required: true }),
          React.createElement('input', { type: 'password',
            placeholder: 'Enter your password',
            id: 'pass',
            ref: 'pass',
            className: 'form-control input-margin',
            required: true }),
          React.createElement('input', { type: 'submit',
            id: 'login',
            value: 'Login',
            className: 'btn btn-primary',
            onClick: this.increment })
        )
      )
    );
  }
});