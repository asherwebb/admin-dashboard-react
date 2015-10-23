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
var HotelAddress = React.createClass({
	displayName: 'HotelAddress',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description
		);
	}
});
//hotel location has lat and lng then a point is made and stored in parse db
var HotelLocation = React.createClass({
	displayName: 'HotelLocation',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description
		);
	}
});
//rendering involves a checked or unchecked indicator with edit button
var ProfileCheckboxInputModule = React.createClass({
	displayName: 'ProfileCheckboxInputModule',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description
		);
	}
});
//parse option selected and send
var ProfileSelectInputModule = React.createClass({
	displayName: 'ProfileSelectInputModule',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'panel' },
			this.props.description
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
	componentDidMount: function componentDidMount() {},
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