"use strict";

var HubCitiesList = React.createClass({
	displayName: "HubCitiesList",

	removeCityFromList: function removeCityFromList(i) {
		this.props.removeCity(i);
		console.log("you clicked" + i);
		//get element at i from array, remove and reset state
	},
	render: function render() {

		return React.createElement(
			"div",
			null,
			this.props.data.map(function (hotel, i) {
				return React.createElement(
					"div",
					{ key: i },
					hotel,
					" ",
					React.createElement(
						"button",
						{ onClick: this.removeCityFromList.bind(this, i) },
						"Delete"
					)
				);
			}, this)
		);
	}

});

var AppPolicies = React.createClass({
	displayName: "AppPolicies",

	render: function render() {
		return React.createElement(
			"p",
			null,
			this.props.data
		);
	}
});

var SettingsBox = React.createClass({
	displayName: "SettingsBox",

	getInitialState: function getInitialState() {
		return {
			hubCities: [],
			appPolicies: ''
		};
	},
	updateDbHubCities: function updateDbHubCities(hubCities) {
		var hubCities = hubCities;
		console.log(hubCities);
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);
		settingsInfoQuery.first({
			success: function success(settings) {
				settings.save({ hub_cities: hubCities }, {
					success: function success(results) {
						console.log('hub cities updated');
					},
					error: function error(results, _error2) {
						alert("Error: Hub city update was not able to be processed");
					}
				});
			},
			error: function error(settings, _error) {
				alert("Error: Settings cannot be accessed");
			}

		});
	},
	removeCity: function removeCity(cityIndex) {
		console.log(cityIndex);
		var hubCities = this.state.hubCities;
		console.log(hubCities);
		hubCities[cityIndex] = null;
		hubCities = _.compact(hubCities);

		this.updateDbHubCities(hubCities);
		this.setState({ hubCities: hubCities });
	},
	addCity: function addCity(e) {
		e.preventDefault();
		var hubCity = this.refs.addHubCity.getDOMNode().value;
		console.log(hubCity);
		var hubCities = this.state.hubCities;
		console.log(hubCities);
		hubCities.unshift(hubCity);
		console.log(hubCities);
		this.updateDbHubCities(hubCities);
		this.setState({ hubCities: hubCities });
		//this.state.hubCities
		//array.unshift(new city)
		//call set state with new arr
		this.refs.addHubCity.getDOMNode().value = '';
	},
	componentWillMount: function componentWillMount() {
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: (function (obj) {
				var hubCitiesArray = obj.get('hub_cities');
				console.log(hubCitiesArray);
				var appPolicies = obj.get("app_policies");

				this.setState({ hubCities: hubCitiesArray, appPolicies: appPolicies });
			}).bind(this),
			error: (function (obj, error) {
				alert('Error retreiving hub cities');
			}).bind(this)
		});
	},
	render: function render() {

		return React.createElement(
			"div",
			{ className: "container-fluid" },
			React.createElement(
				"h3",
				null,
				"Settings Views"
			),
			React.createElement(
				"button",
				null,
				"Close"
			),
			React.createElement(
				"label",
				null,
				"Hub Cities"
			),
			React.createElement("br", null),
			React.createElement(
				"span",
				null,
				"These hub cities will appear on the home screen of the Swing Shift Mobile application along with a near me option to ensure users will be funneled toward cities that initially have hotels offerring rooms in the app."
			),
			React.createElement(HubCitiesList, { data: this.state.hubCities, removeCity: this.removeCity }),
			React.createElement(
				"div",
				{ className: "form-inline" },
				React.createElement("input", { type: "text", className: "form-control", placeholder: "City, St", ref: "addHubCity" }),
				React.createElement(
					"button",
					{ className: "btn", onClick: this.addCity },
					"Add Hub City"
				)
			),
			React.createElement("br", null),
			React.createElement(
				"label",
				null,
				"General App Booking Policies"
			),
			React.createElement(
				"span",
				null,
				"This information appears during the booking process and informs the users of Swing Shift booking policies."
			),
			React.createElement("br", null),
			React.createElement(AppPolicies, { data: this.state.appPolicies }),
			React.createElement(
				"button",
				null,
				"edit general policies"
			),
			React.createElement("br", null)
		);
	}
});