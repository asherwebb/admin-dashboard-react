"use strict";

var CreateUserBox = React.createClass({
	displayName: "CreateUserBox",

	cancelNewUser: function cancelNewUser() {
		this.props.isActive(false);
	},
	createNewUser: function createNewUser() {
		var username = this.refs.newUsername.getDOMNode().value;
		var pass = this.refs.createUserPassword.getDOMNode().value;
		var email = this.refs.createUserEmail.getDOMNode().value;
		var phone = this.refs.createUserPhone.getDOMNode().value;
		var hotel_name = this.refs.createUserHotelName.getDOMNode().value;
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", pass);
		user.set("email", email);
		user.set("hotel_name", hotel_name);
		user.set("phone", phone);
		user.signUp(null, {
			success: (function (user) {
				alert('user sign up success');
				var user_key = user.id;
				//create a new hotel profile object with the hotel name and a link to the user
				var HotelProfile = Parse.Object.extend("hotel_profile");
				var hotelProfile = new HotelProfile();

				var payload = {
					"hotel_name": hotel_name,
					"user_key": user_key,
					"linked_username": username
				};

				hotelProfile.save(payload, {
					success: (function (hotelProfile) {
						//FIX ME:
						//grab the hotel profile id and store will need to ref in profile form where we get created profile to update
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
							error: function error(_error3) {
								alert('User Authorization Error');
							}
						});
						this.props.isActive();
					}).bind(this),
					error: function error(hotelProfile, _error2) {
						alert('Failed to create new object, with error code: ' + _error2.message);
					}
				});
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
			"div",
			{ className: "panel panel-default" },
			React.createElement(
				"h2",
				null,
				"Create New User Form"
			),
			React.createElement(
				"form",
				{ id: "create-user-form" },
				React.createElement("input", { type: "text", ref: "newUsername", placeholder: "New Username", className: "form-control input-margin", required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "email", ref: "createUserEmail", placeholder: "New User Email", className: "form-control input-margin", required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "password", ref: "createUserPassword", placeholder: "New User Password", className: "form-control input-margin", required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "text", ref: "createUserPhone", placeholder: "New User Phone", className: "form-control input-margin", required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "text", placeholder: "Enter name of hotel this user will administer", ref: "createUserHotelName", className: "form-control input-margin", required: true }),
				React.createElement("br", null),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.cancelNewUser, className: "btn btn-danger delete-user-btn btn-small" },
						" Cancel ",
						React.createElement("span", { "class": "glyphicon glyphicon-remove-circle" })
					),
					React.createElement(
						"button",
						{ onClick: this.createNewUser, className: "btn btn-success btn-large" },
						" Submit "
					)
				)
			)
		);
	}
});