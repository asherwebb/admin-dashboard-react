'use strict';

var HotelUser = React.createClass({
	displayName: 'HotelUser',

	getInitialState: function getInitialState() {
		return {
			profileComplete: false,
			creatingProfile: false
		};
	},
	createProfile: function createProfile() {
		this.setState({ creatingProfile: true });
	},
	notCreateProfile: function notCreateProfile(hideForm) {

		this.setState({ creatingProfile: false });
	},
	render: function render() {
		var createBtnStatus = this.state.creatingProfile ? true : false;
		var profileButton = this.state.profileComplete ? React.createElement(
			'button',
			null,
			'view profile'
		) : React.createElement(
			'button',
			{ onClick: this.createProfile, disabled: createBtnStatus },
			'create profile'
		);
		var createProfileView = this.state.creatingProfile ? React.createElement(CreateHotelProfile, { displayForm: this.notCreateProfile, hotelId: this.props.objId }) : '';
		var x = this.state.creatingProfile ? React.createElement(
			'button',
			{ onClick: this.notCreateProfile },
			'Close'
		) : '';
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h2',
				null,
				this.props.username,
				this.props.objId
			),
			profileButton,
			React.createElement('br', null),
			x,
			createProfileView
		);
	}
});
var CreateUserBox = React.createClass({
	displayName: 'CreateUserBox',

	componentWillMount: function componentWillMount() {},
	createNewUser: function createNewUser() {
		var username = this.refs.newUsername.getDOMNode().value;
		var pass = this.refs.createUserPassword.getDOMNode().value;
		var email = this.refs.createUserEmail.getDOMNode().value;
		var phone = this.refs.createUserPhone.getDOMNode().value;
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", pass);
		user.set("email", email);
		user.set("phone", phone);
		user.signUp(null, {
			success: (function (user) {
				this.props.data = this.props.data.push(username);
				alert('New user has been created and a verification email has been sent!');
				//Now the current parse user is set to the newly signed up user lets grab initial auth info
				var data = localStorage.getItem('data');
				data = JSON.parse(data);
				var storedPass = data.pass;
				var storedUsername = data.username;
				//now re-login as admin, the react isLoggedin status never changed
				Parse.User.logIn(storedUsername, storedPass, {
					success: (function (login) {}).bind(this),
					error: function error(_error2) {
						alert('User Authorization Error');
					}
				});
				this.props.isActive();
			}).bind(this),
			error: function error(user, _error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + _error.code + " " + _error.message);
			}
		});
		return false;
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'form',
				null,
				React.createElement('input', { type: 'text', ref: 'newUsername', placeholder: 'New Username', required: true }),
				React.createElement('input', { type: 'email', ref: 'createUserEmail', placeholder: 'New User Email', required: true }),
				React.createElement('input', { type: 'password', ref: 'createUserPassword', placeholder: 'New User Password', required: true }),
				React.createElement('input', { type: 'text', ref: 'createUserPhone', placeholder: 'New User Phone', required: true }),
				React.createElement(
					'button',
					{ onClick: this.createNewUser },
					' Submit '
				)
			)
		);
	}
});

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
		if (this.state.counter === 10) {
			alert('Too many login attempts. Your account has been suspended please contact support.');
			//set a cookie here to see if user is locked out
			return;
		};
		var username = this.refs.username.getDOMNode().value;
		var pass = this.refs.pass.getDOMNode().value;

		//store ls cookie to allow admin to re-login after new user sign up Parse login wierdness
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
				'h2',
				null,
				'Login'
			),
			React.createElement(
				'form',
				{ onSubmit: this.processLogin },
				React.createElement(
					'div',
					{ className: 'center-400w' },
					React.createElement('input', { type: 'text', placeholder: 'Enter your username', id: 'username', ref: 'username', className: 'form-control input-margin', required: true }),
					React.createElement('input', { type: 'password', placeholder: 'Enter your password', id: 'pass', ref: 'pass', className: 'form-control input-margin', required: true }),
					React.createElement('input', { type: 'submit', id: 'login', value: 'Login', className: 'btn btn-primary', onClick: this.increment })
				)
			)
		);
	}
});

var Dashboard = React.createClass({
	displayName: 'Dashboard',

	getInitialState: function getInitialState() {
		return {
			data: [],
			isAdmin: false,
			creatingUser: false,
			editingUserProfile: false,
			viewHotelDashboard: false
		};
	},
	componentWillMount: function componentWillMount() {
		var query = new Parse.Query(Parse.User);
		query.equalTo("isAdmin", true);
		query.find({
			success: (function (admins) {
				for (var i = 0; i < admins.length; i++) {
					if (admins[i].id === Parse.User.current().id) {
						this.setState({ isAdmin: true });
					}
				}
			}).bind(this)
		});

		var data = [];
		var allUsers = new Parse.Query(Parse.User);

		allUsers.notEqualTo("isAdmin", true);

		allUsers.find({
			success: (function (items) {
				//alert(items.length);
				for (var i = 0; i < items.length; i++) {
					var userData = {};
					userData.uid = items[i].id;
					console.log(userData.uid);
					userData.username = items[i].get('username');
					data.push(userData);
				}

				this.setState({ data: data });
			}).bind(this)
		});
	},
	renderCreateUserBox: function renderCreateUserBox() {
		this.setState({ creatingUser: true });
	},
	creatingUser: function creatingUser() {
		this.setState({ creatingUser: false });
	},
	logout: function logout() {
		Parse.User.logOut().then((function (results) {
			console.log(results);
			this.props.filter({ loggedIn: false });
		}).bind(this));
	},
	render: function render() {
		//we need to get the user object ids and use them as keys in the hotel users for reference key={}, make sure to hook up to the hotel user data model
		var hotelUserNodes = this.state.data.map(function (user) {
			//alert(user.uid);
			return React.createElement(HotelUser, { username: user.username, key: user.uid, objId: user.uid });
		});
		var isAdmin = this.state.isAdmin ? React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				'Welcome SwingShift Admin'
			),
			React.createElement(
				'button',
				{ disabled: this.state.creatingUser, onClick: this.renderCreateUserBox },
				'Create User'
			),
			React.createElement(
				'h2',
				null,
				' list of users '
			),
			hotelUserNodes
		) : React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				'Welcome SwingShift Hotel Member'
			),
			React.createElement(
				'button',
				null,
				'Profile'
			),
			React.createElement(
				'button',
				null,
				'View Dashboard'
			)
		);
		var isCreatingUser = this.state.creatingUser ? React.createElement(CreateUserBox, { isActive: this.creatingUser, data: this.state.data }) : '';
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h2',
				null,
				'Swing Shift Hotels ',
				React.createElement(
					'button',
					{ onClick: this.logout },
					'Logout'
				)
			),
			isCreatingUser,
			isAdmin
		);
	}
});
var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		//DEBUG set loggedIn to false for production
		return {
			loggedIn: true
		};
	},
	userAuth: function userAuth(auth) {
		this.setState(auth);
	},
	render: function render() {
		var isLoggedIn = this.state.loggedIn ? React.createElement(Dashboard, { filter: this.userAuth }) : React.createElement(LoginForm, { filter: this.userAuth });
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'SwingShift'
			),
			isLoggedIn
		);
	}
});

React.render(React.createElement(App, null), document.getElementById('content'));