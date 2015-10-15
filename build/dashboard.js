"use strict";

var Dashboard = React.createClass({
	displayName: "Dashboard",

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
					userData.email = items[i].get('email');
					userData.username = items[i].get('username');

					//FIX ME:
					//lets grab the email as well to display, then query the hotel profile and display the hotel name.
					//create a flag in parse to say 'profile complete'
					//change button to view profile, edit profile and scratch create profile if they have a profile
					//otherwise still display the create profile button
					//may have to pass up as props

					var HotelQuery = new Parse.Object.extend("hotel_profile");
					var hotelQuery = new Parse.Query(HotelQuery);
					hotelQuery.equalTo("user_key", userData.uid);
					hotelQuery.first({
						success: (function (object) {
							if (object !== undefined) {
								console.log(object);
								//get hotel name
								userData.hotelId = object.id;
								userData.profileComplete = object.get("profile_complete");
								userData.hotelName = object.get("hotel_name");
								//see if profile is complete
								data.push(userData);
								this.setState({ data: data });
							}
						}).bind(this),
						error: function error() {}
					});
				}
			}).bind(this)
		});
	},
	renderCreateUserBox: function renderCreateUserBox() {
		this.setState({ creatingUser: true });
	},
	creatingUser: function creatingUser(display) {
		console.log(display);
		//display should be true or false
		this.setState({ creatingUser: display });
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
			return React.createElement(HotelUser, { hotelId: user.hotelId, username: user.username, key: user.uid, objId: user.uid, email: user.email, profileComplete: user.profileComplete, hotelName: user.hotelName });
		});

		var isAdmin = this.state.isAdmin ? React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				null,
				"Welcome SwingShift Admin ",
				React.createElement(
					"button",
					{ onClick: this.logout, className: "btn btn-danger pull-right" },
					"Logout"
				),
				" "
			),
			React.createElement(
				"button",
				{ disabled: this.state.creatingUser, onClick: this.renderCreateUserBox, className: "btn btn-primary" },
				"Create User"
			),
			React.createElement(
				"button",
				{ className: "btn btn-info mg-settings" },
				"Manage Settings"
			),
			React.createElement(
				"h3",
				{ className: "bg-primary" },
				"Current Hotel Users "
			),
			hotelUserNodes
		) : React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				null,
				"Welcome SwingShift Hotel Member ",
				React.createElement(
					"button",
					{ onClick: this.logout, className: "btn btn-danger" },
					"Logout"
				),
				" "
			),
			React.createElement(
				"button",
				null,
				"Profile"
			),
			React.createElement(
				"button",
				null,
				"View Dashboard"
			)
		);
		var isCreatingUser = this.state.creatingUser ? React.createElement(CreateUserBox, { isActive: this.creatingUser, data: this.state.data }) : '';
		return React.createElement(
			"div",
			{ className: "jumbotron padding-left container" },
			isCreatingUser,
			isAdmin
		);
	}
});