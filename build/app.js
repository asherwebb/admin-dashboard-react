"use strict";

var App = React.createClass({
	displayName: "App",

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
			"div",
			null,
			React.createElement(
				"div",
				{ className: "page-header" },
				React.createElement(
					"h2",
					{ className: "pad-left" },
					"SwingShift Hotels Dashboard"
				)
			),
			isLoggedIn
		);
	}
});

React.render(React.createElement(App, null), document.getElementById('content'));