'use strict';

var BookingTicketClass = {
	date_available: '02-14-1989',
	room_type: 'Beach View',
	room_rate: '100', //.00 USD
	tax_rate: '10', //%
	rooms_available: '10',
	rooms_booked: '0',
	additional_fees: '0', //.OO USD
	additional_fees_description: '',
	rooms_held: '0',
	date_created: '', //auto created by parse
	objectId: '', //auto created by parse
	swing_shift_payout: '10' //%
};

var RoomInventoryDashboard = React.createClass({
	displayName: 'RoomInventoryDashboard',

	getInitialState: function getInitialState() {
		return {
			hotelName: '',
			imageSrc: ''
		};
	},
	componentWillMount: function componentWillMount() {
		var user = Parse.User.current();
		var hotelId = user.id;
		var hotelName = user.get("hotel_name");
		var imageSrc;
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);
		hotelProfileQuery.first(hotelId, {
			success: (function (hotel) {
				var image = hotel.get("featured_image");
				imageSrc = image.url();
			}).bind(this),
			error: function error(hotel, _error) {
				alert("Error: Hotel information unavailable");
			}
		});
		this.setState({ hotelName: hotelName, imageSrc: imageSrc });
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				this.props.description
			),
			React.createElement(
				'p',
				null,
				this.state.hotelName
			),
			React.createElement('img', { src: this.state.imageSrc })
		);
	}
});