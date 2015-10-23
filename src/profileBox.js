//FIXME: consider moving tax rate, addl fees, addl fee desc and default nightly rate out of profile and into dashboard
var ProfileBox = React.createClass({
	getInitialState: function() {
		return { 
			data:''
		}
	},
	componentWillMount: function(){
		var hotelId = this.props.hotelId;
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);
			hotelProfileQuery.get( hotelId , {
				success: function(hotel) {
					var address = hotel.get("address");
					console.log(address);


					 var data = {
						featured_image: hotel.get("featured_image").url(),
						hotel_image_1 : hotel.get("hotel_image_1").url(),
						hotel_image_2 : hotel.get("hotel_image_2").url(),
						hotel_image_3 : hotel.get("hotel_image_3").url(),
						hotel_image_4 : hotel.get("hotel_image_4").url(),
						hotel_image_5 : hotel.get("hotel_image_5").url(),
						hotel_image_6 : hotel.get("hotel_image_6").url(),
						hotel_image_7 : hotel.get("hotel_image_7").url(),
						hotel_image_8 : hotel.get("hotel_image_8").url(),
						hotel_image_9 : hotel.get("hotel_image_9").url(),
						hotel_image_10 : hotel.get("hotel_image_10").url(),
						hotel_image_11 : hotel.get("hotel_image_11").url(),
						hotel_image_12 : hotel.get("hotel_image_12").url(),
						about_hotel : hotel.get("about_hotel"),
						short_about_hotel : hotel.get("short_about_hotel"),
						address_line_1: hotel.get("address_line_1"),
						address_city: hotel.get("address_city"),
						address_state: hotel.get("address_state"),
						location : hotel.get("location"),
						hub_city : hotel.get("hub_city"),
						complimentary_wifi : hotel.get("complimentary_wifi"),
						complimentary_self_parking : hotel.get("complimentary_self_parking"),
						fitness_center : hotel.get("fitness_center"),
						outdoor_pool : hotel.get("outdoor_pool"),
						valet_parking : hotel.get("valet_parking"),
						valet_parking_fee : hotel.get("valet_parking_fee"),
						indoor_pool : hotel.get("indoor_pool"),
						hot_tub : hotel.get("hot_tub"),
						sauna : hotel.get("sauna"),
						beach_access : hotel.get("beach_access"),
						ski_access : hotel.get("ski_access"),
						spa_services : hotel.get("spa_services"),
						restaurant_on_site : hotel.get("restaurant_on_site"),
						bar_on_site : hotel.get("bar_on_site"),
						room_service : hotel.get("room_service"),
						pets_allowed : hotel.get("pets_allowed"),
						phone_checkbox : hotel.get("phone_checkbox"),
						nightly_rate : hotel.get("nightly_rate"),
						taxes : hotel.get("taxes"),
						additional_fees : hotel.get("additional_fees"),
						additional_fees_desc : hotel.get("additional_fees_desc"),
						hotel_style : hotel.get("hotel_style"),
						restaurant_regional_cuisine : hotel.get("restaurant_regional_cuisine"),
						drinks_beach_club : hotel.get("drinks_beach_club"),
						timezone : hotel.get("timezone")
					};

					this.setState( { data:data } );
				}.bind(this),
					error: function( hotel, error){
						alert('Failed to access hotel profile, with error code: ' + error.message);
				}
		});
	},
	updateDb: function( key, update, editElem){
		var update = update, hotelId = this.props.hotelId, key=key, editElem = editElem;
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);
		var payload = {};
		payload[key] = update;
		hotelProfileQuery.get( hotelId , {
			success: function(hotel) {
				hotel.save(payload, {
					success: function(result){
					}.bind(this),
					error: function(){
					}
				});
			}.bind( this ),
			error: function(hotel, error){
			}
		});
	},
	updateHotelLocation: function() {

	},
	updateMod: function(key, update, editElem){
		var data ={}, key = key, update = update, editElem = editElem;
		console.log(update);
		//update.url means we have an image - we need to pass to data already formatted as url to render the src
		//when this occurs we need to take update.url and pass to data but pass update to db
		if( update.url ){
			var dataUpdate = update.url();
					data = {};
			data = this.state.data;
			data[key] = dataUpdate;
			this.setState({data:data});
			this.updateDb(key, update, editElem);
		}else{
			data = this.state.data;
			data[key] = update;
			this.setState( { data: data } );
			this.updateDb(key, update, editElem);
		}
	},
    render: function() {
      return(
      	<div>
        	<h1>Profile View {this.props.hotelName} </h1>

        	<ProfileTextAreaInputModule data={this.state.data.about_hotel} onUpdate={this.updateMod} editElem="textarea" objKey="about_hotel" description="About Hotel"/>
        		
        	<p>Featured Image</p>
        	<HotelImage data={this.state.data.featured_image} onUpdate={this.updateMod} editElem="file" objKey="featured_image" />
			
			<ProfileTextInputModule data={this.state.data.short_about_hotel} onUpdate={this.updateMod} editElem="text" objKey="short_about_hotel" description="Short about hotel"/>

			<ProfileTextInputModule data={this.state.data.address_line_1} onUpdate={this.updateMod} editElem="text" objKey="address_line_1" description="Address Line 1"/>
			<ProfileTextInputModule data={this.state.data.address_city} onUpdate={this.updateMod} editElem="text" objKey="address_city" description="Address City" />
			<ProfileSelectInputModule data={this.state.data.address_state} onUpdate={this.updateMod} editElem="select" objKey="address_state" description="Address State" />



			<HotelLocation data={this.state.data.location} onUpdate={this.updateHotelLocation} editElem="mixed" objKey="location" description="Hotel Location" />			
			<ProfileSelectInputModule data={this.state.data.hub_city} onUpdate={this.updateMod} editElem="select" objKey="hub_city" description="" />
			<ProfileCheckboxInputModule data={this.state.data.complimentary_wifi} onUpdate={this.updateMod} editElem="checkbox" objKey="complimentary_wifi" description="Complimentary Wi-fi" />
			<ProfileCheckboxInputModule data={this.state.data.complimentary_self_parking} onUpdate={this.updateMod} editElem="checkbox" objKey="complimentary_self_parking" description="Complimentary Self Parking" />
			<ProfileCheckboxInputModule data={this.state.data.fitness_center} onUpdate={this.updateMod} editElem="checkbox" objKey="fitness_center" description="Fitness Center" />
			<ProfileCheckboxInputModule data={this.state.data.outdoor_pool} onUpdate={this.updateMod} editElem="checkbox" objKey="outdoor_pool" description="Outdoor Pool" />
			<ProfileCheckboxInputModule data={this.state.data.valet_parking} onUpdate={this.updateMod} editElem="checkbox" objKey="valet_parking" description="Valet Parking" />
			<ProfileCheckboxInputModule data={this.state.data.valet_parking_fee} onUpdate={this.updateMod} editElem="checkbox" objKey="valet_parking_fee" description="Valet Parking Fee" />
			<ProfileCheckboxInputModule data={this.state.data.indoor_pool} onUpdate={this.updateMod} editElem="checkbox" objKey="indoor_pool" description="Indoor Pool" />
			<ProfileCheckboxInputModule data={this.state.data.hot_tub} onUpdate={this.updateMod} editElem="checkbox" objKey="hot_tub" description="Hot Tub" />
			<ProfileCheckboxInputModule data={this.state.data.sauna} onUpdate={this.updateMod} editElem="checkbox" objKey="sauna" description="Sauna" />
			<ProfileCheckboxInputModule data={this.state.data.beach_access} onUpdate={this.updateMod} editElem="checkbox" objKey="beach_access" description="Beach Access" />
			<ProfileCheckboxInputModule data={this.state.data.ski_access} onUpdate={this.updateMod} editElem="checkbox" objKey="ski_access" description="Ski Access" />
			<ProfileCheckboxInputModule data={this.state.data.spa_services} onUpdate={this.updateMod} editElem="checkbox" objKey="spa_services" description="Spa Services" />
			<ProfileCheckboxInputModule data={this.state.data.restaurant_on_site} onUpdate={this.updateMod} editElem="checkbox" objKey="restaurant_on_site" description="Restaurant On Site" />
			<ProfileCheckboxInputModule data={this.state.data.bar_on_site} onUpdate={this.updateMod} editElem="checkbox" objKey="bar_on_site" description="Bar On Site" />
			<ProfileCheckboxInputModule data={this.state.data.room_service} onUpdate={this.updateMod} editElem="checkbox" objKey="room_service" description="Room Service" />
			<ProfileCheckboxInputModule data={this.state.data.pets_allowed} onUpdate={this.updateMod} editElem="checkbox" objKey="pets_allowed" description="Pets Allowed" />
			<ProfileCheckboxInputModule data={this.state.data.phone_checkbox} onUpdate={this.updateMod} editElem="checkbox" objKey="phone_checkbox" description="Phone" />
			<ProfileCheckboxInputModule data={this.state.data.restaurant_regional_cuisine} onUpdate={this.updateMod} editElem="checkbox" objKey="restaurant_regional_cuisine" description="Restaurant Serves Regional Cuisine" />
			<ProfileCheckboxInputModule data={this.state.data.drinks_beach_club} onUpdate={this.updateMod} editElem="checkbox" objKey="drinks_beach_club" description="Drinks At Beach Club" />
			<ProfileSelectInputModule data={this.state.data.timezone} onUpdate={this.updateMod} editElem="select" objKey="timezone" description="Timezone" />
			<ProfileSelectInputModule data={this.state.data.hotel_style} onUpdate={this.updateMod} editElem="select" objKey="hotel_style" description="Hotel Style" />
			<ProfileTextInputModule data={this.state.data.nightly_rate} onUpdate={this.updateMod} editElem="number" objKey="nightly_rate" description="Nightly Rate" />
			<ProfileTextInputModule data={this.state.data.taxes} onUpdate={this.updateMod} editElem="number" objKey="taxes" description="Taxes" />
			<ProfileTextInputModule data={this.state.data.additional_fees} onUpdate={this.updateMod} editElem="number" objKey="additional_fees" description="Additional Fees" />
			<ProfileTextInputModule data={this.state.data.additional_fees_desc} onUpdate={this.updateMod} editElem="text" objKey="additional_fees_desc" description="Additional Fees Description" />

        	<p>Hotel Images</p>
        	<HotelImage data={this.state.data.hotel_image_1} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_1" />
        	<HotelImage data={this.state.data.hotel_image_2} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_2" />
        	<HotelImage data={this.state.data.hotel_image_3} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_3" />
        	<HotelImage data={this.state.data.hotel_image_4} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_4" />
        	<HotelImage data={this.state.data.hotel_image_5} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_5" />
        	<HotelImage data={this.state.data.hotel_image_6} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_6" />
        	<HotelImage data={this.state.data.hotel_image_7} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_7" />
        	<HotelImage data={this.state.data.hotel_image_8} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_8" />
        	<HotelImage data={this.state.data.hotel_image_9} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_9" />
        	<HotelImage data={this.state.data.hotel_image_10} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_10" />
        	<HotelImage data={this.state.data.hotel_image_11} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_11" />
        	<HotelImage data={this.state.data.hotel_image_12} onUpdate={this.updateMod} editElem="file" objKey="hotel_image_12" />
        </div> 
        );
    }
});

