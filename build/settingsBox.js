'use strict';

var HubCitiesList = React.createClass({
	displayName: 'HubCitiesList',

	removeCityFromList: function removeCityFromList(i) {
		this.props.removeCity(i);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h4',
				null,
				'Hub Cities'
			),
			React.createElement(
				'p',
				null,
				'These hub cities will appear on the home screen of the Swing Shift Mobile application along with a near me option to ensure users will be funneled toward cities that initially have hotels offerring rooms in the app.'
			),
			this.props.data.map(function (hotel, i) {
				return React.createElement(
					'div',
					{ key: i },
					hotel,
					' ',
					React.createElement(
						'button',
						{ onClick: this.removeCityFromList.bind(this, i) },
						'Delete'
					)
				);
			}, this)
		);
	}

});

var AppPolicies = React.createClass({
	displayName: 'AppPolicies',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit'
		};
	},
	updatePolicies: function updatePolicies(e) {
		e.preventDefault();
		var policy = this.refs.appPolicy.getDOMNode().value;
		this.props.onUpdate(policy);
		this.editingToggle();
	},
	editPolicy: function editPolicy(e) {
		e.preventDefault();
		this.editingToggle();
	},
	editingToggle: function editingToggle() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	render: function render() {
		var appPoliciesState = this.state.underEditing ? React.createElement(
			'div',
			null,
			React.createElement('textarea', { ref: 'appPolicy', className: 'form-control', defaultValue: this.props.data }),
			React.createElement(
				'button',
				{ onClick: this.updatePolicies, className: 'btn btn-success' },
				'Save'
			)
		) : React.createElement(
			'p',
			null,
			this.props.data
		);
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h4',
				null,
				'General App Booking Policies'
			),
			React.createElement(
				'p',
				null,
				'This information appears during the booking process and informs the users of Swing Shift booking policies.'
			),
			appPoliciesState,
			React.createElement(
				'button',
				{ onClick: this.editPolicy },
				this.state.buttonText
			)
		);
	}
});

var SettingsBox = React.createClass({
	displayName: 'SettingsBox',

	getInitialState: function getInitialState() {
		return {
			hubCities: [],
			appPolicies: ''
		};
	},
	updateSettingsParse: function updateSettingsParse(data) {
		var data = data;
		var payload = data.data;
		var label = data.label;

		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: function success(settings) {
				settings.save(payload, {
					success: function success(results) {
						console.log(label + 'updated');
					},
					error: function error(results, _error2) {
						alert("Error: " + label + " update was not able to be processed");
					}
				});
			},
			error: function error(settings, _error) {
				alert("Error: Settings cannot be accessed");
			}
		});
	},
	removeCity: function removeCity(cityIndex) {
		var hubCities = this.state.hubCities;
		hubCities[cityIndex] = null;
		hubCities = _.compact(hubCities);
		var data = { data: { hub_cities: hubCities }, label: "Hub Cities" };
		this.updateSettingsParse(data);
		this.setState({ hubCities: hubCities });
	},
	addCity: function addCity(e) {
		e.preventDefault();
		var hubCity = this.refs.addHubCity.getDOMNode().value;
		var hubCities = this.state.hubCities;
		hubCities.unshift(hubCity);

		var data = { data: { hub_cities: hubCities }, label: "Hub Cities" };

		this.updateSettingsParse(data);
		this.setState({ hubCities: hubCities });
		this.refs.addHubCity.getDOMNode().value = '';
	},
	componentWillMount: function componentWillMount() {
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: (function (obj) {
				var hubCitiesArray = obj.get('hub_cities');
				var appPolicies = obj.get("app_policies");

				this.setState({ hubCities: hubCitiesArray, appPolicies: appPolicies });
			}).bind(this),
			error: (function (obj, error) {
				alert('Error retreiving hub cities');
			}).bind(this)
		});
	},
	updateAppPolicies: function updateAppPolicies(policy) {
		var policy = policy;
		this.setState({ appPolicies: policy });
		var data = { data: { app_policies: policy }, label: "App Policies" };
		this.updateSettingsParse(data);
	},
	closeSettings: function closeSettings(e) {
		e.preventDefault();
		this.props.hideBox();
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'container-fluid' },
			React.createElement(
				'h3',
				null,
				'Settings Views'
			),
			' ',
			React.createElement(
				'button',
				{ className: 'btn', onClick: this.closeSettings },
				'Close'
			),
			React.createElement(HubCitiesList, { data: this.state.hubCities, removeCity: this.removeCity }),
			React.createElement(
				'div',
				{ className: 'form-inline' },
				React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'City, St', ref: 'addHubCity' }),
				React.createElement(
					'button',
					{ className: 'btn', onClick: this.addCity },
					'Add Hub City'
				)
			),
			React.createElement(AppPolicies, { data: this.state.appPolicies, onUpdate: this.updateAppPolicies }),
			React.createElement('br', null)
		);
	}
});