'use strict';

var ProfileTextInputModule = React.createClass({
	displayName: 'ProfileTextInputModule',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit'
		};
	},
	toggleEditTrigger: function toggleEditTrigger(e) {
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function toggleEdit() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	updateModule: function updateModule(e) {
		//FIX ME: currently since 1 value is being passed at a time we are not updating the parse geo-point
		//do not anticipate having many hotels change location
		e.preventDefault();
		var key = this.props.objKey,
		    editElem = this.props.editElem,
		    update = this.refs[key].getDOMNode().value;
		if (editElem === "number") {
			update = parseInt(update);
		}

		this.props.onUpdate(key, update, editElem);
		this.toggleEdit();
	},
	render: function render() {
		var moduleState = this.state.underEditing ? React.createElement(
			'div',
			{ className: 'panel' },
			React.createElement('input', { ref: this.props.objKey, type: 'text', defaultValue: this.props.data }),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ className: 'btn btn-success', onClick: this.updateModule },
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
			this.props.description,
			moduleState,
			React.createElement(
				'button',
				{ onClick: this.toggleEditTrigger },
				' ',
				this.state.buttonText,
				' '
			)
		);
	}
});
//hotel address has address line 1, city, state

//hotel location has lat and lng then a point is made and stored in parse db

//rendering involves a checked or unchecked indicator with edit button
var ProfileCheckboxInputModule = React.createClass({
	displayName: 'ProfileCheckboxInputModule',

	getInitialState: function getInitialState() {
		return {
			style: "btn btn-default faded"
		};
	},
	componentDidMount: function componentDidMount() {},
	toggleCheck: function toggleCheck() {},
	render: function render() {
		var isCheckedBtn = this.state.style;
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description,
			React.createElement(
				'button',
				{ type: 'button', className: isCheckedBtn, onClick: this.toggleCheck },
				React.createElement('span', { className: 'glyphicon glyphicon-ok-sign' })
			)
		);
	}
});
//parse option selected and send
var ProfileSelectInputModule = React.createClass({
	displayName: 'ProfileSelectInputModule',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit',
			selectData: [],
			hub_cities: []
		};
	},
	componentDidMount: function componentDidMount() {
		var data = [];
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: (function (settings) {
				var hubCitiesArray = settings.get("hub_cities");
				//put those cities in appropriate select
				//console.log(hubCitiesArray);
				console.log(hubCitiesArray);

				for (var i = 0; i < hubCitiesArray.length; i++) {
					var item = {};
					item.value = hubCitiesArray[i];
					item.text = hubCitiesArray[i];
					data.push(item);
				}

				console.log(data);
				this.setState({ hub_cities: data });
			}).bind(this),
			error: function error(settings, _error) {
				alert("Error: Hub cities cannot be accessed");
			}
		});
	},
	checkSelectInputKey: function checkSelectInputKey(key) {
		//check obj key timezone or state etc need to pull in options and set state in data and then map those options to select in render
		var data = [];
		var key = key;
		switch (key) {
			case "address_state":
				data = [{ text: "", value: "" }, { text: "AK", value: "AK" }, { text: "AL", value: "AL" }, { text: "AR", value: "AR" }, { text: "AS", value: "AS" }, { text: "AZ", value: "AZ" }, { text: "CA", value: "CA" }, { text: "CO", value: "CO" }, { text: "CT", value: "CT" }, { text: "DC", value: "DC" }, { text: "DE", value: "DE" }, { text: "FL", value: "FL" }, { text: "GA", value: "GA" }, { text: "GU", value: "GU" }, { text: "HI", value: "HI" }, { text: "IA", value: "IA" }, { text: "ID", value: "ID" }, { text: "IL", value: "IL" }, { text: "IN", value: "IN" }, { text: "KS", value: "KS" }, { text: "KY", value: "KY" }, { text: "LA", value: "LA" }, { text: "MA", value: "MA" }, { text: "MD", value: "MD" }, { text: "ME", value: "ME" }, { text: "MI", value: "MI" }, { text: "MN", value: "MN" }, { text: "MO", value: "MO" }, { text: "MS", value: "MS" }, { text: "MT", value: "MT" }, { text: "NC", value: "NC" }, { text: "ND", value: "ND" }, { text: "NE", value: "NE" }, { text: "NH", value: "NH" }, { text: "NJ", value: "NJ" }, { text: "NM", value: "NM" }, { text: "NV", value: "NV" }, { text: "NY", value: "NY" }, { text: "OH", value: "OH" }, { text: "OK", value: "OK" }, { text: "OR", value: "OR" }, { text: "PA", value: "PA" }, { text: "RI", value: "RI" }, { text: "SC", value: "SC" }, { text: "SD", value: "SD" }, { text: "TN", value: "TN" }, { text: "TX", value: "TX" }, { text: "UT", value: "UT" }, { text: "VA", value: "VA" }, { text: "VI", value: "VI" }, { text: "VT", value: "VT" }, { text: "WA", value: "WA" }, { text: "WI", value: "WI" }, { text: "WV", value: "WV" }, { text: "WY", value: "WY" }];
				this.setState({ selectData: data });
				break;

			case "timezone":
				data = [{ text: "Eastern Time - New York, NY USA", value: "ET" }, { text: "Eastern Time - New York, NY USA", value: "ET" }, { text: "Eastern Time - New York, NY USA", value: "ET" }, { text: "Eastern Time - New York, NY USA", value: "ET" }];
				this.setState({ selectData: data });
				break;

			case "hub_city":

				data = this.state.hub_cities;

				this.setState({ selectData: data });
				break;

			case "hotel_style":
				var initData = ["GLAM", "LUX", "HIP", "REFINED", "SOUND", "BASIC"];

				for (var i = 0; i < initData.length; i++) {
					var item = {};
					item.value = initData[i];
					item.text = initData[i];
					data.push(item);
				};
				this.setState({ selectData: data });
				break;
		}
	},
	toggleEditTrigger: function toggleEditTrigger(e) {
		e.preventDefault();
		var key = this.props.objKey;
		this.toggleEdit();
		this.checkSelectInputKey(key);
	},
	toggleEdit: function toggleEdit() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	updateModule: function updateModule(e) {
		e.preventDefault();
		var key = this.props.objKey,
		    editElem = this.props.editElem;

		var update = React.findDOMNode(this.refs[key]);
		update = $(update).val();

		this.props.onUpdate(key, update, editElem);
		this.toggleEdit();
	},
	render: function render() {
		var selectOptions = this.state.selectData.map(function (opt, i) {
			return React.createElement(
				'option',
				{ value: opt.value, key: i },
				opt.text
			);
		});

		var moduleState = this.state.underEditing ? React.createElement(
			'div',
			{ className: 'panel' },
			React.createElement(
				'select',
				{ ref: this.props.objKey, id: this.props.objKey, defaultValue: this.props.data, className: 'form-control' },
				selectOptions
			),
			React.createElement(
				'button',
				{ className: 'btn btn-success', onClick: this.updateModule },
				'Save'
			)
		) : React.createElement(
			'p',
			null,
			this.props.data
		);
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description,
			moduleState,
			React.createElement(
				'button',
				{ onClick: this.toggleEditTrigger },
				' ',
				this.state.buttonText,
				' '
			)
		);
	}
});

var ProfileTextAreaInputModule = React.createClass({
	displayName: 'ProfileTextAreaInputModule',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit'
		};
	},
	toggleEditTrigger: function toggleEditTrigger(e) {
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function toggleEdit() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	updateModule: function updateModule(e) {
		e.preventDefault();
		var update = this.refs.about_hotel.getDOMNode().value;
		var editElem = this.props.editElem;
		var key = this.props.objKey;
		this.props.onUpdate(key, update, editElem);
		this.toggleEdit();
	},
	render: function render() {
		var moduleState = this.state.underEditing ? React.createElement(
			'div',
			null,
			React.createElement('textarea', { ref: 'about_hotel', defaultValue: this.props.data }),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ className: 'btn btn-success', onClick: this.updateModule },
				'Save'
			)
		) : React.createElement(
			'p',
			null,
			this.props.data
		);

		return React.createElement(
			'div',
			{ className: 'panel' },
			React.createElement(
				'h4',
				null,
				this.description
			),
			moduleState,
			React.createElement(
				'button',
				{ onClick: this.toggleEditTrigger },
				' ',
				this.state.buttonText,
				' '
			)
		);
	}
});

var HotelImage = React.createClass({
	displayName: 'HotelImage',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit'
		};
	},
	updateModule: function updateModule(e) {
		var key = this.props.objKey;
		var image;

		switch (key) {
			case "featured_image":
				image = this.refs.featured_image.getDOMNode().files[0];
				break;
			case "hotel_image_1":
				image = this.refs.hotel_image_1.getDOMNode().files[0];
				break;
			case "hotel_image_2":
				image = this.refs.hotel_image_2.getDOMNode().files[0];
				break;
			case "hotel_image_3":
				image = this.refs.hotel_image_3.getDOMNode().files[0];
				break;
			case "hotel_image_4":
				image = this.refs.hotel_image_4.getDOMNode().files[0];
				break;
			case "hotel_image_5":
				image = this.refs.hotel_image_5.getDOMNode().files[0];
				break;
			case "hotel_image_6":
				image = this.refs.hotel_image_6.getDOMNode().files[0];
				break;
			case "hotel_image_7":
				image = this.refs.hotel_image_7.getDOMNode().files[0];
				break;
			case "hotel_image_8":
				image = this.refs.hotel_image_8.getDOMNode().files[0];
				break;
			case "hotel_image_9":
				image = this.refs.hotel_image_9.getDOMNode().files[0];
				break;
			case "hotel_image_10":
				image = this.refs.hotel_image_10.getDOMNode().files[0];
				break;
			case "hotel_image_11":
				image = this.refs.hotel_image_11.getDOMNode().files[0];
				break;
			case "hotel_image_12":
				image = this.refs.hotel_image_12.getDOMNode().files[0];
				break;
		}

		var update = new Parse.File(key + '.jpg', image);
		update.save().then((function (obj) {
			this.props.onUpdate(key, update);
			this.toggleEdit();
		}).bind(this), function (error) {
			alert("Error uploading image");
		});
	},
	toggleEditTrigger: function toggleEditTrigger(e) {
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function toggleEdit() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	render: function render() {
		var moduleState = this.state.underEditing ? React.createElement(
			'div',
			null,
			React.createElement('input', { ref: this.props.objKey, type: 'file' }),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ className: 'btn btn-success', onClick: this.updateModule },
				'Save'
			),
			React.createElement(
				'p',
				{ className: 'warning' },
				' Make sure your images are saved at 640 pixels width and 520 pixels height at 72 pixels per inch in .jpg format'
			)
		) : React.createElement('img', { src: this.props.data, className: 'hotel-img-preview' });

		return React.createElement(
			'div',
			{ className: 'panel' },
			moduleState,
			React.createElement(
				'button',
				{ onClick: this.toggleEditTrigger },
				' ',
				this.state.buttonText,
				' '
			)
		);
	}
});