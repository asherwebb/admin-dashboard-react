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
				alert('New user sign up was successful!');
				var user_key = user.id;
				var userCreatedAt = user.createdAt;
				//create a new hotel profile object with the hotel name and a link to the user
				var HotelProfile = Parse.Object.extend("hotel_profile");
				var hotelProfile = new HotelProfile();
				var parseUser = Parse.User.current();
				var payload = {
					"hotel_name": hotel_name,
					"user_key": user_key,
					"linked_username": username,
					"user": parseUser,
					"profile_complete": false
				};

				hotelProfile.save(payload, {
					success: (function (hotelProfile) {
						alert('New user has been created and a verification email has been sent!');
						//optimistic ui update		  				
						var userData = {
							profileComplete: false,
							uid: user_key,
							email: email,
							hotelName: hotel_name,
							hotelId: hotelProfile.id,
							username: username,
							createdAt: userCreatedAt
						};

						var data = localStorage.getItem('data');
						data = JSON.parse(data);
						var storedPass = data.pass;
						var storedUsername = data.username;
						//now re-login as admin, the react isLoggedin status never changed
						Parse.User.logIn(storedUsername, storedPass, {
							success: (function (login) {
								this.props.userCreatedUpdate(userData);
							}).bind(this),
							error: function error(_error3) {
								alert('Error: User authorization');
							}
						});
						this.props.isActive();
					}).bind(this),
					error: function error(hotelProfile, _error2) {
						alert('Error: Failed to create new object, with error code: ' + _error2.message);
					}
				});
			}).bind(this),
			error: function error(user, _error) {
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
				{ className: "left-margin-100" },
				"Create New User Form"
			),
			React.createElement(
				"form",
				{ id: "create-user-form" },
				React.createElement("input", { type: "text",
					ref: "newUsername",
					placeholder: "New Username",
					className: "form-control input-margin",
					required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "email",
					ref: "createUserEmail",
					placeholder: "New User Email",
					className: "form-control input-margin",
					required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "password",
					ref: "createUserPassword",
					placeholder: "New User Password",
					className: "form-control input-margin",
					required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "text",
					ref: "createUserPhone",
					placeholder: "New User Phone",
					className: "form-control input-margin",
					required: true }),
				React.createElement("br", null),
				React.createElement("input", { type: "text",
					ref: "createUserHotelName",
					placeholder: "Enter name of hotel this user will administer",
					className: "form-control input-margin",
					required: true }),
				React.createElement("br", null),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.cancelNewUser, className: "btn btn-danger delete-user-btn btn-small" },
						"Cancel",
						React.createElement("span", { "class": "glyphicon glyphicon-remove-circle" })
					),
					React.createElement(
						"button",
						{ onClick: this.createNewUser, className: "btn btn-success btn-large" },
						"Submit"
					)
				)
			)
		);
	}
});