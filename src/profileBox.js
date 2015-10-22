//FIXME: consider moving tax rate, addl fees, addl fee desc and default nightly rate out of profile and into dashboard
var ProfileBox = React.createClass({
	getInitialState: function() {
		return { 
			data:''
		}
	},
	componentWillMount: function(){
		//fetch parse data for the object 

		var hotelId = this.props.hotelId;
		//display in ui with options to edit each field
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);

		hotelProfileQuery.get( hotelId , {
			success: function(hotel) {

				//get it all
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
			address: hotel.get("address"),
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
//set state
this.setState( {data:data} );
				}.bind(this),
				error: function( hotel, error){
					alert('Failed to access hotel profile, with error code: ' + error.message);
				}
		});

	},
	updateDb: function(key, update, data){
		var update = update;
		var data = data;
		var hotelId = this.props.hotelId;
		//display in ui with options to edit each field
		var HotelProfile = Parse.Object.extend("hotel_profile");
		var hotelProfileQuery = new Parse.Query(HotelProfile);

		hotelProfileQuery.get( hotelId , {
			success: function(hotel) {
				hotel.save({key:update}, {
					success: function(result){
						console.log('hotel updated');
						this.setState({data:data});

					}.bind(this),
					error: function(){

					}
				});
			}.bind( this ),
			error: function(hotel, error){

			}
		});
	},
	updateMod: function(key, update, data){
		var key = key, update = update;

		if( update.url() ){
			update = update.url();
		}

		var data = {};
			data = this.state.data;
			data[key] = update;

			this.updateDb(key, update, data);
	},
    render: function() {

      return(
      	<div>
        	<h1>Profile View {this.props.hotelName} </h1>

        	<AboutHotel data={this.state.data.about_hotel} onUpdate={this.updateMod} editElem="textarea" objKey="about_hotel" />
        	<p>Hotel Images</p>
        	<HotelImage data={this.state.data.featured_image} onUpdate={this.updateMod} editElem="file" objKey="featured_image" />
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

