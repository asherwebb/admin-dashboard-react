"use strict";

var Dashboard = React.createClass({
	displayName: "Dashboard",

	getInitialState: function getInitialState() {
		return {
			data: [], isAdmin: false, creatingUser: false, editingUserProfile: false, viewHotelDashboard: false
		};
	},
	userCreatedUpdate: function userCreatedUpdate(userData) {
		var data = [];
		var currentItems = this.state.data;
		data = currentItems;
		data.unshift(userData);
		this.setState({ data: data });
	},
	userRemovedUpdate: function userRemovedUpdate(hotel) {
		var hotelId = hotel.id;
		alert(hotelId);
		//hotel should contain hotel object id
		//get this.state.data
		//find hotel to remove by key
		//pop that index out of the array
		//set state with new array as data
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
		var userHotelLink = [];
		var mergedHotelUserData = [];
		var allUsers = new Parse.Query(Parse.User);

		allUsers.notEqualTo("isAdmin", true);
		allUsers.find({
			success: (function (items) {
				for (var i = 0; i < items.length; i++) {
					var userData = {};
					userData.uid = items[i].id;
					userData.email = items[i].get('email');
					userData.username = items[i].get('username');
					data.push(userData);
					userHotelLink.push(userData.uid);
				};

				//extend user data objects to include hotel data objects in new array
				var HotelQuery = new Parse.Object.extend("hotel_profile");
				var hotelQuery = new Parse.Query(HotelQuery);
				hotelQuery.containedIn("user_key", userHotelLink);
				hotelQuery.find({
					success: (function (results) {
						var hotelMatchItems = results;
						var arrayMatchData = hotelMatchItems.map(function (object) {
							var rObj = {};
							rObj.createdAt = object.createdAt;
							rObj.hotelUserKey = object.get('user_key');
							rObj.hotelId = object.id;
							rObj.profileComplete = object.get('profile_complete');
							rObj.hotelName = object.get('hotel_name');
							return rObj;
						});

						var orderedHotelProfileDataSetArray = _.sortBy(arrayMatchData, 'createdAt');
						var orderedUserProfileDataSetArray = _.sortBy(data, 'createdAt');

						//console.log(orderedHotelProfileDataSetArray);

						mergedHotelUserData = orderedUserProfileDataSetArray.map(function (item, i) {
							var mObj = {};
							mObj = _.extend(item, orderedHotelProfileDataSetArray[i]);
							console.log(mObj);
							return mObj;
						});
						//reverse to display createdAt order descending
						mergedHotelUserData = mergedHotelUserData.reverse();
						//console.log(mergedHotelUserData);					
						this.setState({ data: mergedHotelUserData });
					}).bind(this),
					error: function error() {}
				});
			}).bind(this)
		});
	},
	renderCreateUserBox: function renderCreateUserBox() {
		this.setState({ creatingUser: true });
	},
	creatingUser: function creatingUser(display) {
		//? display should be true or false ?
		this.setState({ creatingUser: display });
	},
	logout: function logout() {
		Parse.User.logOut().then((function (results) {
			this.props.filter({ loggedIn: false });
		}).bind(this));
	},
	render: function render() {
		//FIX ME: duplicate key issue check users and hotel
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
				React.createElement("span", { className: "glyphicon glyphicon-plus" }),
				" Create User"
			),
			React.createElement(
				"button",
				{ className: "btn btn-info mg-settings" },
				React.createElement("span", { className: "glyphicon glyphicon-option-horizontal" }),
				" Manage Settings"
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

		var isCreatingUser = this.state.creatingUser ? React.createElement(CreateUserBox, { isActive: this.creatingUser, userCreatedUpdate: this.userCreatedUpdate, data: this.state.data }) : '';
		return React.createElement(
			"div",
			{ className: "jumbotron padding-left container" },
			isCreatingUser,
			isAdmin
		);
	}
});