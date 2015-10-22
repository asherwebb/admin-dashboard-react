'use strict';

var AboutHotel = React.createClass({
	displayName: 'AboutHotel',

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
		this.toggleEdit();
		var key = this.props.objKey;
		this.props.onUpdate(key, update);
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
			null,
			React.createElement(
				'h4',
				null,
				'About Hotel'
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
		//depending on the key assign image to correct dom node
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
			console.log(obj.url());
			this.props.onUpdate(key, update);
			this.toggleEdit();
		}).bind(this));
		//create a new parse file of the image
		//update the ui
		//send to parse
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
			)
		) : React.createElement('img', { src: this.props.data });
		return React.createElement(
			'div',
			null,
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