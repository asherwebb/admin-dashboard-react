var CreateHotelProfile = React.createClass({
	closeProfileForm: function(e){
		e.preventDefault();
		this.props.displayForm();
	},
	componentWillMount: function(){
		var SettingsInfo = Parse.Object.extend( "Settings_Info" );
		var settingsInfoQuery = new Parse.Query( SettingsInfo );

		settingsInfoQuery.first({
			success: function( settings ){
				var hubCitiesArray = settings.get("hub_cities");
				//put those cities in appropriate select
				//console.log(hubCitiesArray);
				for(var i=0; i<hubCitiesArray.length; i++){
					$("#hubCities").append("<option value='" + hubCitiesArray[i] + "'>"+hubCitiesArray[i]+"</option>");
				}
			},
			error: function(settings, error){
				alert("Error: Hub cities cannot be accessed");
			}
		});
	},
	componentDidMount: function(){
		//set up a preview with jquery and traditional dom
		$('input[type="file"]').change(function(e) {
			e.preventDefault();
			var inputId = this.id;			
			var reader = new FileReader();
    		reader.onload = function(){
				//get output by data id that matches inputId above
      			var output = $( "img[data-id='" + inputId + "']");
      			$(output).width( '320px' );
       			$(output).height( '260px' );
      			$(output).attr('src', reader.result);
      			$( output ).after( '<button class="clearPreview btn btn-default" data-clear=' + inputId + '> X </button>' );
      			$(".clearPreview").on( 'click' , function(e){
      				e.preventDefault();
      				$(this).remove();
      				$(output).width( '0' );
       				$(output).height( '0' );
      				$(output).attr('src','');
      				var linkedImg = $("#" + $(this).data('clear'));
      				linkedImg.replaceWith( linkedImg.val('').clone( true ));
      			});
    		};

    	if( this.files[0] ){
    		reader.readAsDataURL( this.files[0] );
    	} else {
    		$(output).attr('src','');
    	}
		});
	},
	submitHotelProfile: function(e){
		e.preventDefault();
		var hotelId = this.props.hotelId;

		$( "#progressbox" ).show();
		$( "#progressbar" ).progressbar({
      		value: 0
    	});

		var about_hotel = this.refs.about_hotel.getDOMNode().value;
		var short_about_hotel = this.refs.short_about_hotel.getDOMNode().value;
		var hotel_entered_address = this.refs.hotel_entered_address.getDOMNode().value;
		var city = this.refs.city.getDOMNode().value;
		var hotel_select_state = this.refs.hotel_select_state.getDOMNode().selected;

		var hotel_entered_latitude = parseInt( this.refs.hotel_entered_latitude.getDOMNode().value );
		var hotel_entered_longitude = parseInt( this.refs.hotel_entered_longitude.getDOMNode().value );
		var point = new Parse.GeoPoint({latitude: hotel_entered_latitude, longitude: hotel_entered_longitude});

		var hub_city = this.refs.hub_city.getDOMNode().selected;
		var complimentary_wifi = this.refs.complimentary_wifi.getDOMNode().checked;
		var complimentary_self_parking = this.refs.complimentary_self_parking.getDOMNode().checked;
		var fitness_center = this.refs.fitness_center.getDOMNode().checked;
		var outdoor_pool = this.refs.outdoor_pool.getDOMNode().checked;
		var valet_parking = this.refs.valet_parking.getDOMNode().checked;
		var valet_parking_fee = this.refs.valet_parking_fee.getDOMNode().checked;
		var indoor_pool = this.refs.indoor_pool.getDOMNode().checked;
		var hot_tub = this.refs.hot_tub.getDOMNode().checked;
		var sauna = this.refs.sauna.getDOMNode().checked;
		var beach_access = this.refs.beach_access.getDOMNode().checked;
		var ski_access = this.refs.ski_access.getDOMNode().checked;
		var spa_services = this.refs.spa_services.getDOMNode().checked;
		var restaurant_on_site = this.refs.restaurant_on_site.getDOMNode().checked;
		var bar_on_site = this.refs.bar_on_site.getDOMNode().checked;
		var room_service = this.refs.room_service.getDOMNode().checked;
		var pets_allowed = this.refs.pets_allowed.getDOMNode().checked;
		var phone_checkbox = this.refs.phone_checkbox.getDOMNode().checked;

		var nightly_rate = parseInt( this.refs.nightly_rate.getDOMNode().value );
		var taxes = parseInt( this.refs.taxes.getDOMNode().value );
		var additional_fees = parseInt( this.refs.additional_fees.getDOMNode().value );
		var additional_fees_desc = this.refs.additional_fees_desc.getDOMNode().value;
		var hotel_style = this.refs.hotel_style.getDOMNode().selected;
		var restaurant_regional_cuisine = this.refs.restaurant_regional_cuisine.getDOMNode().checked;
		var drinks_beach_club = this.refs.drinks_beach_club.getDOMNode().checked;
		var timezone = this.refs.timezone.getDOMNode().selected;

		//### i m a g e s ###
		var featured_image = this.refs.featured_image.getDOMNode().files[0];
  		var featured_imageParse = new Parse.File('featured_image.jpg', featured_image);

		var hotel_image_1 = this.refs.hotel_image_1.getDOMNode().files[0];
		var hotel_image_1Parse = new Parse.File('hotel_image_1.jpg', hotel_image_1);

		var hotel_image_2 = this.refs.hotel_image_2.getDOMNode().files[0];
		var hotel_image_2Parse = new Parse.File('hotel_image_2.jpg', hotel_image_2);

		var hotel_image_3 = this.refs.hotel_image_3.getDOMNode().files[0];
		var hotel_image_3Parse = new Parse.File('hotel_image_3.jpg', hotel_image_3);

		var hotel_image_4 = this.refs.hotel_image_4.getDOMNode().files[0];
		var hotel_image_4Parse = new Parse.File('hotel_image_4.jpg', hotel_image_4);

		var hotel_image_5 = this.refs.hotel_image_5.getDOMNode().files[0];
		var hotel_image_5Parse = new Parse.File('hotel_image_5.jpg', hotel_image_5);

		var hotel_image_6 = this.refs.hotel_image_6.getDOMNode().files[0];
		var hotel_image_6Parse = new Parse.File('hotel_image_6.jpg', hotel_image_6);

		var hotel_image_7 = this.refs.hotel_image_7.getDOMNode().files[0];
		var hotel_image_7Parse = new Parse.File('hotel_image_7.jpg', hotel_image_7);

		var hotel_image_8 = this.refs.hotel_image_8.getDOMNode().files[0];
		var hotel_image_8Parse = new Parse.File('hotel_image_8.jpg', hotel_image_8);

		var hotel_image_9 = this.refs.hotel_image_9.getDOMNode().files[0];
		var hotel_image_9Parse = new Parse.File('hotel_image_9.jpg', hotel_image_9);

		var hotel_image_10 = this.refs.hotel_image_10.getDOMNode().files[0];
		var hotel_image_10Parse = new Parse.File('hotel_image_10.jpg', hotel_image_10);

		var hotel_image_11 = this.refs.hotel_image_11.getDOMNode().files[0];
		var hotel_image_11Parse = new Parse.File('hotel_image_11.jpg', hotel_image_11);

		var hotel_image_12 = this.refs.hotel_image_12.getDOMNode().files[0];
		var hotel_image_12Parse = new Parse.File('hotel_image_12.jpg', hotel_image_12);

		 var payload = {
		 	"profile_complete":true,
			"featured_image": featured_imageParse,
			"hotel_image_1" : hotel_image_1Parse,
			"hotel_image_2" : hotel_image_2Parse,
			"hotel_image_3" : hotel_image_3Parse,
			"hotel_image_4" : hotel_image_4Parse,
			"hotel_image_5" : hotel_image_5Parse,
			"hotel_image_6" : hotel_image_6Parse,
			"hotel_image_7" : hotel_image_7Parse,
			"hotel_image_8" : hotel_image_8Parse,
			"hotel_image_9" : hotel_image_9Parse,
			"hotel_image_10" : hotel_image_10Parse,
			"hotel_image_11" : hotel_image_11Parse,
			"hotel_image_12" : hotel_image_12Parse,
			"about_hotel" : about_hotel,
			"short_about_hotel" : short_about_hotel,
			"address" : {
				"body": hotel_entered_address,
				"city": city,
				"state": hotel_select_state
			},	
			"location" : point,
			"hub_city" : hub_city,
			"complimentary_wifi" : complimentary_wifi,
			"complimentary_self_parking" : complimentary_self_parking,
			"fitness_center" : fitness_center,
			"outdoor_pool" : outdoor_pool,
			"valet_parking" : valet_parking,
			"valet_parking_fee" : valet_parking_fee,
			"indoor_pool" : indoor_pool,
			"hot_tub" : hot_tub,
			"sauna" : sauna,
			"beach_access" : beach_access,
			"ski_access" : ski_access,
			"spa_services" : spa_services,
			"restaurant_on_site" : restaurant_on_site,
			"bar_on_site" : bar_on_site,
			"room_service" : room_service,
			"pets_allowed" : pets_allowed,
			"phone_checkbox" : phone_checkbox,
			"nightly_rate" : nightly_rate,
			"taxes" : taxes,
			"additional_fees" : additional_fees,
			"additional_fees_desc" : additional_fees_desc,
			"hotel_style" : hotel_style,
			"restaurant_regional_cuisine" : restaurant_regional_cuisine,
			"drinks_beach_club" : drinks_beach_club,
			"timezone" : timezone
		};

		var inc = 1/13;//13 images
		inc = inc * 100;
		//console.log("inc is:" + inc);
		var counter=1;

		function incrementProgressBar(counter){			
			var value = inc * counter;
			// console.log("value is:" + value);
			$("#progressbar").progressbar("option" , "value" , value );
			};

		featured_imageParse.save().then(function() {
			counter = counter + 1;
			incrementProgressBar(counter);
			hotel_image_1Parse.save().then(function() {
				counter = counter + 1;
				incrementProgressBar(counter);
				hotel_image_2Parse.save().then(function(){
					counter = counter + 1;
					incrementProgressBar(counter);
					hotel_image_3Parse.save().then(function(){
						counter = counter + 1;
						incrementProgressBar(counter);
						hotel_image_4Parse.save().then(function(){
							counter = counter + 1;
							incrementProgressBar(counter);
							hotel_image_5Parse.save().then(function(){
								counter = counter + 1;
								incrementProgressBar(counter);
								hotel_image_6Parse.save().then(function(){
									counter = counter + 1;
									incrementProgressBar(counter);
									hotel_image_7Parse.save().then(function(){
										counter = counter + 1;
										incrementProgressBar(counter);
										hotel_image_8Parse.save().then(function(){
											counter = counter + 1;
											incrementProgressBar(counter);
											hotel_image_9Parse.save().then(function(){
												counter = counter + 1;
												incrementProgressBar(counter);
												hotel_image_10Parse.save().then(function(){
													counter = counter + 1;
													incrementProgressBar(counter);
													hotel_image_11Parse.save().then(function(){
														counter = counter + 1;
														incrementProgressBar(counter);
														hotel_image_12Parse.save().then(function(){
															counter = counter + 1;
															incrementProgressBar(counter);
															//we need to query hotel profile as it already exists
																var HotelProfile = Parse.Object.extend("hotel_profile");
																var hotelProfileQuery = new Parse.Query(HotelProfile);
																hotelProfileQuery.get( hotelId , {
																	success: function(hotel) {
																		//save the payload to the hotel

																		hotel.save(payload, {
																			success: function(completeHotelProfile){
																				alert('Successfully created profile!');
																				//console.log(completeHotelProfile);
																				counter = counter +1;
																				incrementProgressBar();
																				$("#progressbox").hide();
																			//FIX ME: need to pass props back to parent state
																			this.props.profileComplete({profileComplete: true});
																			}.bind(this),
																			error: function( completeHotelProfile, error){
				 																alert('Failed to create new object, with error code: ' + error.message);
																			}
																		});
																	}.bind(this),
																	error: function( hotel, error ) {

																	}
																});											
														}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
													}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
												}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
											}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
										}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
									}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
								}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
							}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
						}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
					}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
				}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
			}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
		}.bind(this), function(error){ alert( 'There has been an error processing image upload' ); });
	},
	render: function(){
		return(
			<div className="container-fluid pad-top">			
				<form>
					<div>
					<textarea ref="about_hotel" placeholder="About Hotel..." className="form-control" ></textarea><br />
					<input ref="short_about_hotel" type="text" placeholder="Hotel Summary" className="form-control" /><br />
					<input ref="hotel_entered_address" type="text" placeholder="Address Line 1" className="form-control" /><br />
					</div>
					<div>
  						<div className="row">
							<div className="col-xs-6">
								<input ref="city" type="text" placeholder="Address City" className="form-control" />
 							</div>

  							<div className="col-xs-6 form-inline" >
  							<span>State: </span>
								<select ref="hotel_select_state" className="form-control" >
				 					<option value="AL">AL</option> <option value="AK">AK</option> <option value="AZ">AZ</option> <option value="AR">AR</option> <option value="CA">CA</option> <option value="CO">CO</option> <option value="CT">CT</option> <option value="DE">DE</option> <option value="DC">DC</option> <option value="FL">FL</option> <option value="GA">GA</option> <option value="HI">HI</option> <option value="ID">ID</option> <option value="IL">IL</option> <option value="IN">IN</option> <option value="IA">IA</option> <option value="KS">KS</option> <option value="KY">KY</option> <option value="LA">LA</option> <option value="ME">ME</option> <option value="MD">MD</option> <option value="MA">MA</option> <option value="MI">MI</option> <option value="MN">MN</option> <option value="MS">MS</option> <option value="MO">MO</option> <option value="MT">MT</option> <option value="NE">NE</option> <option value="NV">NV</option> <option value="NH">NH</option> <option value="NJ">NJ</option> <option value="NM">NM</option> <option value="NY">NY</option> <option value="NC">NC</option> <option value="ND">ND</option> <option value="OH">OH</option> <option value="OK">OK</option> <option value="OR">OR</option> <option value="PA">PA</option> <option value="RI">RI</option> <option value="SC">SC</option> <option value="SD">SD</option> <option value="TN">TN</option> <option value="TX">TX</option> <option value="UT">UT</option> <option value="VT">VT</option> <option value="VA">VA</option> <option value="WA">WA</option> <option value="WV">WV</option> <option value="WI">WI</option> <option value="WY">WY</option>
								</select>
  							</div>
  						</div>
  					</div>
  					<br />
					
					<div className="fieldgroup container-fluid" >
					<div className="well">
					  	<div className="row">
							<div className="col-xs-6">
							<input ref="hotel_entered_latitude" type="text" placeholder="Latitude" className="form-control" />
							</div>

							<div className="col-xs-6">
							<input ref="hotel_entered_longitude" type="text" placeholder="Longitude" className="form-control" />
							</div>

						</div>


					<a href="http://itouchmap.com/latlong.html" target="_blank">Use this link if you need assistance</a>
					</div>
					</div>

					<div>
					  	<div className="row">
							<div className="col-xs-8">
								<div className="form-inline fieldgroup">
									<label>Timezone: </label>
									<select id="timezone" ref="timezone" className="form-control" >
										<option value="ET">Eastern Time - New York, NY USA</option>
										<option value="CT">Central Time - Chicago, IL USA</option>
										<option value="MT">Mountain Time - Denver, CO USA</option>
										<option value="PT">Pacific Time - Los Angeles, CA USA</option>
									</select>
								</div>
							</div>

							<div className="col-xs-4">
								<div className="fieldgroup form-inline">
								<label>Hub City: </label>
								<select ref="hub_city" className="form-control" id="hubCities" >
								<option val="-"> - </option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div className="form-inline pad-top">
				<label>Hotel Style: </label>
				<select id="hotel_style" ref="hotel_style" className="form-control" >
						<option value="-">-</option>
						<option value="GLAM">GLAM</option>
						<option value="LUX">LUX</option>
						<option value="HIP">HIP</option>
						<option value="REFINED">REFINED</option>
						<option value="SOUND">SOUND</option>
						<option value="BASIC">BASIC</option>
				</select>
				</div>

					<p>Amenities</p>


					<div className="form-inline">
  						<div className="row">

 							<div className="col-xs-6">
 								<div className="checkbox">
									<label>
									<input ref="complimentary_wifi" type="checkbox" />
									Complimentary Wifi 
									</label>
								</div>
 							</div>

  							<div className="col-xs-6">
  								<div className="checkbox">
									<label>
									<input ref="complimentary_self_parking" type="checkbox" />
									Complimentary self-parking 
									</label>
								</div>
  							</div>

  						</div>

  						<div className="row">

 							<div className="col-xs-6">
	 							<div className="checkbox">
									<label>
									<input ref="fitness_center" type="checkbox" />
									Fitness Center 
									</label>
								</div>
 							</div>

  							<div className="col-xs-6">
  								<div className="checkbox">
									<label>
									<input ref="outdoor_pool" type="checkbox" />
									Outdoor Pool
									</label>
								</div>
  							</div>
  						</div>

  						<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="valet_parking" type="checkbox" />
									Valet Parking
									</label>
								</div>
 							</div>

  							<div className="col-xs-6">
  								<div className="checkbox">
									<label>
									<input ref="valet_parking_fee" type="checkbox" />
									Valet Parking Fee 
									</label>
								</div>
  							</div>
  						</div>

  						<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="indoor_pool" type="checkbox" />
									Indoor Pool
									</label>
								</div>
 							</div>

  							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="hot_tub" type="checkbox" />
									Hot Tub
									</label>
								</div>
  							</div>
  						</div>

   						<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="sauna" type="checkbox" />
									Sauna
									</label>
								</div>
 							</div>

  							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="beach_access" type="checkbox" />
									Beach Access
									</label>
								</div>
  							</div>
  						</div>

	 					<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="ski_access" type="checkbox" />
									Ski Access
									</label>
								</div>
	 						</div>

	  						<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="spa_services" type="checkbox" />
									Spa Services
									</label>
								</div>
	  						</div>
	  					</div>

	 					<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="restaurant_on_site" type="checkbox" />
									Restaurant on Site
									</label>
								</div>
	 						</div>

	  						<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="bar_on_site" type="checkbox" />
									Bar on Site
									</label>
								</div>
	  						</div>
	  					</div>

	 					<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="room_service" type="checkbox" />
									Room Service
									</label>
								</div>
	 						</div>

	  						<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input ref="pets_allowed" type="checkbox" />
									Pets Allowed</label>
								</div>
	  						</div>
	  					</div>

	 					<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input placeholder="Phone" ref="phone_checkbox" type="checkbox" />
									Phone
									</label>
								</div>
	 						</div>

	  						<div className="col-xs-6">
	  							<div className="checkbox">
								<label>
								<input value="Restaurant serves Regional Cuisine" ref="restaurant_regional_cuisine" type="checkbox" />
								Restaurant serves Regional Cuisine
								</label>
							</div>
	  						</div>
	  					</div>

	 					<div className="row">
							<div className="col-xs-6">
								<div className="checkbox">
									<label>
									<input value="Drinks served at the Beach Club" ref="drinks_beach_club" type="checkbox" />
									Drinks served at the Beach Club
									</label>
								</div>
	 						</div>

	  						<div className="col-xs-6">

	  						</div>
	  					</div>

					</div>


					<div className="row">
							<div className="col-xs-4 col-md-4 form-inline">
<label>Nightly Rate</label>
					<div className="input-group">
						<span className="input-group-addon">$</span>
						<input type="text" className="form-control nightly-rate" placeholder="Nightly Rate" ref="nightly_rate" />
						<span className="input-group-addon">.00</span>
					</div>
							</div>
							<div className="col-xs-4 col-md-4 form-inline">
							<label>Taxes: </label>
					<div className="input-group">
						<input placeholder="Taxes" ref="taxes" type="text" className="form-control" />
						<span className="input-group-addon">%</span>
					</div>
							</div>
							<div className="col-xs-4 col-md-4 form-inline">
												<label>Additional Fees</label><div className="input-group">
						<span className="input-group-addon">$</span>
						<input placeholder="Additional Fees" ref="additional_fees" type="text" className="form-control" />
						<span className="input-group-addon">.00</span>
					</div>
							</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-4">
						<label>Additional Fees Description</label>
						</div>
						<div className="col-xs-8">
						<input ref="additional_fees_desc" type="text" className="form-control" />
						</div>
					</div>


			<br />								
						<div className="alert alert-warning" role="alert">
  <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> 
  Make sure your images are saved at 640 pixels width and 520 pixels height at 72 pixels per inch in .jpg format
</div>
<br />
	<div className="alert alert-info" role="alert">
  <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
  You will see a preview of the image. Your images will be uploaded when you submit the entire form.
</div>



						<fieldset>
						<label>Featured Image</label>
						<input ref="featured_image" type="file" id="featured_image" className="form-control" />
						<img data-id="featured_image" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 1</label>
						<input ref="hotel_image_1" type="file" id="hotel_image_1" className="form-control" />
						<img data-id="hotel_image_1" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 2</label>
						<input ref="hotel_image_2" type="file" id="hotel_image_2" className="form-control" />
						<img data-id="hotel_image_2" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 3</label>
						<input ref="hotel_image_3" type="file" id="hotel_image_3" className="form-control" />
						<img data-id="hotel_image_3" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 4</label>
						<input ref="hotel_image_4" type="file" id="hotel_image_4" className="form-control" />
						<img data-id="hotel_image_4" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 5</label>
						<input ref="hotel_image_5" type="file" id="hotel_image_5" className="form-control" />
						<img data-id="hotel_image_5" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 6</label>
						<input ref="hotel_image_6" type="file" id="hotel_image_6" className="form-control" />
						<img data-id="hotel_image_6" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 7</label>
						<input ref="hotel_image_7" type="file" id="hotel_image_7" className="form-control" />
						<img data-id="hotel_image_7" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 8</label>
						<input ref="hotel_image_8" type="file" id="hotel_image_8" className="form-control" />
						<img data-id="hotel_image_8" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 9</label>
						<input ref="hotel_image_9" type="file" id="hotel_image_9" className="form-control" />
						<img data-id="hotel_image_9" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 10</label>
						<input ref="hotel_image_10" type="file" id="hotel_image_10" className="form-control" />
						<img data-id="hotel_image_10" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 11</label>
						<input ref="hotel_image_11" type="file" id="hotel_image_11" className="form-control" />
						<img data-id="hotel_image_11" />
					</fieldset>
					<fieldset>
						<label>Hotel Image 12</label>
						<input ref="hotel_image_12" type="file" id="hotel_image_12" className="form-control" />
						<img data-id="hotel_image_12" />
					</fieldset>

					<button onClick={this.submitHotelProfile} className="btn btn-success">Create Profile</button>
					<button className="btn btn-danger" >Cancel</button>
					<button className="btn btn-warning" >Clear</button>
					<div id="progressbox">
						<p>Creating Profile...</p>
						<div id="progressbar"></div>
					</div>
				</form>
			</div>
		)
	}
});