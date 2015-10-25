//FIXME: consider moving tax rate, addl fees, addl fee desc and default nightly rate out of profile and into dashboard
"use strict";

var ProfileBox = React.createClass({
	displayName: "ProfileBox",

	getInitialState: function getInitialState() {
		return {
			data: ''
		};
	},
	componentWillMount: function componentWillMount() {
		var hotelId = this.props.hotelId;
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);
		hotelProfileQuery.get(hotelId, {
			success: (function (hotel) {
				var data = {
					featured_image: hotel.get("featured_image").url(),
					hotel_image_1: hotel.get("hotel_image_1").url(), hotel_image_2: hotel.get("hotel_image_2").url(), hotel_image_3: hotel.get("hotel_image_3").url(), hotel_image_4: hotel.get("hotel_image_4").url(), hotel_image_5: hotel.get("hotel_image_5").url(), hotel_image_6: hotel.get("hotel_image_6").url(), hotel_image_7: hotel.get("hotel_image_7").url(), hotel_image_8: hotel.get("hotel_image_8").url(), hotel_image_9: hotel.get("hotel_image_9").url(), hotel_image_10: hotel.get("hotel_image_10").url(), hotel_image_11: hotel.get("hotel_image_11").url(), hotel_image_12: hotel.get("hotel_image_12").url(),
					about_hotel: hotel.get("about_hotel"),
					short_about_hotel: hotel.get("short_about_hotel"),
					address_line_1: hotel.get("address_line_1"),
					address_city: hotel.get("address_city"),
					latitude: hotel.get("latitude"),
					longitude: hotel.get("longitude"),
					address_state: hotel.get("address_state"),
					location: hotel.get("location"),
					hub_city: hotel.get("hub_city"),
					complimentary_wifi: hotel.get("complimentary_wifi"),
					complimentary_self_parking: hotel.get("complimentary_self_parking"),
					fitness_center: hotel.get("fitness_center"),
					outdoor_pool: hotel.get("outdoor_pool"),
					valet_parking: hotel.get("valet_parking"),
					valet_parking_fee: hotel.get("valet_parking_fee"),
					indoor_pool: hotel.get("indoor_pool"),
					hot_tub: hotel.get("hot_tub"),
					sauna: hotel.get("sauna"),
					beach_access: hotel.get("beach_access"),
					ski_access: hotel.get("ski_access"),
					spa_services: hotel.get("spa_services"),
					restaurant_on_site: hotel.get("restaurant_on_site"),
					bar_on_site: hotel.get("bar_on_site"),
					room_service: hotel.get("room_service"),
					pets_allowed: hotel.get("pets_allowed"),
					phone_checkbox: hotel.get("phone_checkbox"),
					nightly_rate: hotel.get("nightly_rate"),
					taxes: hotel.get("taxes"),
					additional_fees: hotel.get("additional_fees"),
					additional_fees_desc: hotel.get("additional_fees_desc"),
					hotel_style: hotel.get("hotel_style"),
					restaurant_regional_cuisine: hotel.get("restaurant_regional_cuisine"),
					drinks_beach_club: hotel.get("drinks_beach_club"),
					timezone: hotel.get("timezone")
				};

				this.setState({ data: data });
			}).bind(this),
			error: function error(hotel, _error) {
				alert('Error: Failed to access hotel profile, with error code: ' + _error.message);
			}
		});
	},
	updateDb: function updateDb(key, update, editElem) {
		var update = update,
		    hotelId = this.props.hotelId,
		    key = key,
		    editElem = editElem;
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);
		var payload = {};
		payload[key] = update;
		hotelProfileQuery.get(hotelId, {
			success: (function (hotel) {
				hotel.save(payload, {
					success: (function (result) {}).bind(this),
					error: function error() {
						//FIX ME:
					}
				});
			}).bind(this),
			error: function error(hotel, _error2) {
				//FIX ME:
			}
		});
	},
	updateMod: function updateMod(key, update, editElem) {
		//all profile modules call this fn
		var data = {},
		    key = key,
		    update = update,
		    editElem = editElem;
		//update.url means we have an image - we need to pass to data already formatted as url to render the src
		if (update.url) {
			var dataUpdate = update.url();
			data = {};
			data = this.state.data;
			data[key] = dataUpdate;
			this.setState({ data: data });
			this.updateDb(key, update, editElem);
		} else {
			data = this.state.data;
			data[key] = update;
			this.setState({ data: data });
			this.updateDb(key, update, editElem);
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Profile View ",
				this.props.hotelName,
				" "
			),
			React.createElement(ProfileTextAreaInputModule, { data: this.state.data.about_hotel, onUpdate: this.updateMod, editElem: "textarea", objKey: "about_hotel", description: "About Hotel" }),
			React.createElement(
				"p",
				null,
				"Featured Image"
			),
			React.createElement(HotelImage, { data: this.state.data.featured_image, onUpdate: this.updateMod, editElem: "file", objKey: "featured_image" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.short_about_hotel, onUpdate: this.updateMod, editElem: "text", objKey: "short_about_hotel", description: "Short about hotel" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.address_line_1, onUpdate: this.updateMod, editElem: "text", objKey: "address_line_1", description: "Address Line 1" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.address_city, onUpdate: this.updateMod, editElem: "text", objKey: "address_city", description: "Address City" }),
			React.createElement(ProfileSelectInputModule, { data: this.state.data.address_state, onUpdate: this.updateMod, editElem: "select", objKey: "address_state", description: "Address State" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.latitude, onUpdate: this.updateMod, editElem: "number", objKey: "latitude", description: "Latitude" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.longitude, onUpdate: this.updateMod, editElem: "number", objKey: "longitude", description: "Longitude" }),
			React.createElement(ProfileSelectInputModule, { data: this.state.data.hub_city, onUpdate: this.updateMod, editElem: "select", objKey: "hub_city", description: "Hub City" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.complimentary_wifi, onUpdate: this.updateMod, editElem: "checkbox", objKey: "complimentary_wifi", description: "Complimentary Wi-fi" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.complimentary_self_parking, onUpdate: this.updateMod, editElem: "checkbox", objKey: "complimentary_self_parking", description: "Complimentary Self Parking" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.fitness_center, onUpdate: this.updateMod, editElem: "checkbox", objKey: "fitness_center", description: "Fitness Center" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.outdoor_pool, onUpdate: this.updateMod, editElem: "checkbox", objKey: "outdoor_pool", description: "Outdoor Pool" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.valet_parking, onUpdate: this.updateMod, editElem: "checkbox", objKey: "valet_parking", description: "Valet Parking" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.valet_parking_fee, onUpdate: this.updateMod, editElem: "checkbox", objKey: "valet_parking_fee", description: "Valet Parking Fee" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.indoor_pool, onUpdate: this.updateMod, editElem: "checkbox", objKey: "indoor_pool", description: "Indoor Pool" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.hot_tub, onUpdate: this.updateMod, editElem: "checkbox", objKey: "hot_tub", description: "Hot Tub" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.sauna, onUpdate: this.updateMod, editElem: "checkbox", objKey: "sauna", description: "Sauna" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.beach_access, onUpdate: this.updateMod, editElem: "checkbox", objKey: "beach_access", description: "Beach Access" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.ski_access, onUpdate: this.updateMod, editElem: "checkbox", objKey: "ski_access", description: "Ski Access" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.spa_services, onUpdate: this.updateMod, editElem: "checkbox", objKey: "spa_services", description: "Spa Services" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.restaurant_on_site, onUpdate: this.updateMod, editElem: "checkbox", objKey: "restaurant_on_site", description: "Restaurant On Site" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.bar_on_site, onUpdate: this.updateMod, editElem: "checkbox", objKey: "bar_on_site", description: "Bar On Site" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.room_service, onUpdate: this.updateMod, editElem: "checkbox", objKey: "room_service", description: "Room Service" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.pets_allowed, onUpdate: this.updateMod, editElem: "checkbox", objKey: "pets_allowed", description: "Pets Allowed" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.phone_checkbox, onUpdate: this.updateMod, editElem: "checkbox", objKey: "phone_checkbox", description: "Phone" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.restaurant_regional_cuisine, onUpdate: this.updateMod, editElem: "checkbox", objKey: "restaurant_regional_cuisine", description: "Restaurant Serves Regional Cuisine" }),
			React.createElement(ProfileCheckboxInputModule, { data: this.state.data.drinks_beach_club, onUpdate: this.updateMod, editElem: "checkbox", objKey: "drinks_beach_club", description: "Drinks At Beach Club" }),
			React.createElement(ProfileSelectInputModule, { data: this.state.data.timezone, onUpdate: this.updateMod, editElem: "select", objKey: "timezone", description: "Timezone" }),
			React.createElement(ProfileSelectInputModule, { data: this.state.data.hotel_style, onUpdate: this.updateMod, editElem: "select", objKey: "hotel_style", description: "Hotel Style" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.nightly_rate, onUpdate: this.updateMod, editElem: "number", objKey: "nightly_rate", description: "Nightly Rate" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.taxes, onUpdate: this.updateMod, editElem: "number", objKey: "taxes", description: "Taxes" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.additional_fees, onUpdate: this.updateMod, editElem: "number", objKey: "additional_fees", description: "Additional Fees" }),
			React.createElement(ProfileTextInputModule, { data: this.state.data.additional_fees_desc, onUpdate: this.updateMod, editElem: "text", objKey: "additional_fees_desc", description: "Additional Fees Description" }),
			React.createElement(
				"p",
				null,
				"Hotel Images"
			),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_1, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_1" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_2, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_2" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_3, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_3" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_4, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_4" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_5, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_5" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_6, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_6" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_7, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_7" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_8, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_8" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_9, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_9" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_10, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_10" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_11, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_11" }),
			React.createElement(HotelImage, { data: this.state.data.hotel_image_12, onUpdate: this.updateMod, editElem: "file", objKey: "hotel_image_12" })
		);
	}
});