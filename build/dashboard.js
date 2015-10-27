"use strict";

var Dashboard = React.createClass({
	displayName: "Dashboard",

	getInitialState: function getInitialState() {
		return {
			data: [], isAdmin: false, creatingUser: false, editingUserProfile: false, viewHotelDashboard: false, displaySettings: false
		};
	},
	userCreatedUpdate: function userCreatedUpdate(userData) {
		var data = [],
		    currentItems = this.state.data;
		data = currentItems;
		data.unshift(userData);
		this.setState({ data: data });
	},
	componentWillMount: function componentWillMount() {
		var data = [],
		    userHotelLink = [],
		    mergedHotelUserData = [];
		var allUsers = new Parse.Query(Parse.User);
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

				var HotelQuery = new Parse.Object.extend("hotel_profile");
				var hotelQuery = new Parse.Query(HotelQuery);
				hotelQuery.containedIn("user_key", userHotelLink);
				hotelQuery.find({
					success: (function (results) {
						var hotelMatchItems = results;
						var arrayMatchData = hotelMatchItems.map(function (object) {
							var rObj = {};
							rObj.isActive = object.get("isActive");
							rObj.createdAt = object.createdAt;
							rObj.hotelUserKey = object.get('user_key');
							rObj.hotelId = object.id;
							rObj.profileComplete = object.get('profile_complete');
							rObj.hotelName = object.get('hotel_name');
							return rObj;
						});
						var orderedHotelProfileDataSetArray = _.sortBy(arrayMatchData, 'createdAt');
						var orderedUserProfileDataSetArray = _.sortBy(data, 'createdAt');

						mergedHotelUserData = orderedUserProfileDataSetArray.map(function (item, i) {
							var mObj = {};
							mObj = _.extend(item, orderedHotelProfileDataSetArray[i]);
							if (mObj.isActive === false) {
								return null;
							} else {
								return mObj;
							}
						});

						mergedHotelUserData = mergedHotelUserData.reverse();
						mergedHotelUserData = _.compact(mergedHotelUserData);
						this.setState({ data: mergedHotelUserData });
					}).bind(this),
					error: function error() {
						//FIX ME:
					}
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
	displaySettings: function displaySettings() {
		this.setState({ displaySettings: true });
	},
	logout: function logout() {
		Parse.User.logOut().then((function (results) {
			this.props.filter({ loggedIn: false });
		}).bind(this));
	},
	hideSettings: function hideSettings() {
		this.setState({ displaySettings: false });
	},
	renderRoomInventoryDashboard: function renderRoomInventoryDashboard(e) {
		e.preventDefault();
		//set this to render the appropriate component via change in state
	},
	render: function render() {
		var hotelUserNodes = this.state.data.map(function (user) {
			return React.createElement(HotelUser, { hotelId: user.hotelId,
				username: user.username,
				key: user.uid, objId: user.uid,
				email: user.email,
				profileComplete: user.profileComplete,
				hotelName: user.hotelName });
		});

		var isManagingSettings = this.state.displaySettings ? React.createElement(SettingsBox, { hideBox: this.hideSettings }) : '';

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
				"Create User"
			),
			React.createElement(
				"button",
				{ className: "btn btn-info mg-settings", onClick: this.displaySettings },
				React.createElement("span", { className: "glyphicon glyphicon-option-horizontal" }),
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
				)
			),
			React.createElement(
				"button",
				null,
				"Profile"
			),
			React.createElement(RoomInventoryDashboard, { description: "Room Inventory Dashboard" })
		);

		var isCreatingUser = this.state.creatingUser ? React.createElement(CreateUserBox, { isActive: this.creatingUser,
			userCreatedUpdate: this.userCreatedUpdate,
			data: this.state.data }) : '';
		return React.createElement(
			"div",
			{ className: "jumbotron padding-left container" },
			isCreatingUser,
			isManagingSettings,
			isAdmin
		);
	}
});