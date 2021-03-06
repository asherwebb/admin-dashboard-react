"use strict";

var CreateHotelProfile = React.createClass({
  displayName: "CreateHotelProfile",

  closeProfileForm: function closeProfileForm(e) {
    e.preventDefault();
    this.props.displayForm();
  },
  componentWillMount: function componentWillMount() {
    var SettingsInfo = Parse.Object.extend("Settings_Info");
    var settingsInfoQuery = new Parse.Query(SettingsInfo);

    settingsInfoQuery.first({
      success: function success(settings) {
        var hubCitiesArray = settings.get("hub_cities");
        //FIX ME: these could be mapped the "react" way
        for (var i = 0; i < hubCitiesArray.length; i++) {
          $("#hubCities").append("<option value='" + hubCitiesArray[i] + "'>" + hubCitiesArray[i] + "</option>");
        }
      },
      error: function error(settings, _error) {
        alert("Error: Hub cities cannot be accessed");
      }
    });
  },
  componentDidMount: function componentDidMount() {
    //set up a preview with jquery and traditional dom
    $('input[type="file"]').change(function (e) {
      e.preventDefault();
      var inputId = this.id;
      var reader = new FileReader();
      reader.onload = function () {
        //get output by data id that matches inputId above
        var output = $("img[data-id='" + inputId + "']");
        $(output).width('320px');
        $(output).height('260px');
        $(output).attr('src', reader.result);
        $(output).after('<button class="clearPreview btn btn-default" data-clear=' + inputId + '> X </button>');
        $(".clearPreview").on('click', function (e) {
          e.preventDefault();
          $(this).remove();
          $(output).width('0');
          $(output).height('0');
          $(output).attr('src', '');
          var linkedImg = $("#" + $(this).data('clear'));
          linkedImg.replaceWith(linkedImg.val('').clone(true));
        });
      };

      if (this.files[0]) {
        reader.readAsDataURL(this.files[0]);
      } else {
        $(output).attr('src', '');
      }
    });
  },
  submitHotelProfile: function submitHotelProfile(e) {
    e.preventDefault();
    var hotelId = this.props.hotelId;
    $("#progressbox").show();
    $("#progressbar").progressbar({
      value: 0
    });
    var about_hotel = this.refs.about_hotel.getDOMNode().value;
    var short_about_hotel = this.refs.short_about_hotel.getDOMNode().value;
    var hotel_entered_address = this.refs.hotel_entered_address.getDOMNode().value;
    var city = this.refs.city.getDOMNode().value;
    var hotel_select_state = React.findDOMNode(this.refs.hotel_select_state);
    hotel_select_state = $(hotel_select_state).val();
    var hotel_entered_latitude = parseInt(this.refs.hotel_entered_latitude.getDOMNode().value);
    var hotel_entered_longitude = parseInt(this.refs.hotel_entered_longitude.getDOMNode().value);
    var point = new Parse.GeoPoint({ latitude: hotel_entered_latitude, longitude: hotel_entered_longitude });
    var hub_city = React.findDOMNode(this.refs.hub_city);
    hub_city = $(hub_city).val();

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

    var nightly_rate = parseInt(this.refs.nightly_rate.getDOMNode().value);
    var taxes = parseInt(this.refs.taxes.getDOMNode().value);
    var additional_fees = parseInt(this.refs.additional_fees.getDOMNode().value);
    var additional_fees_desc = this.refs.additional_fees_desc.getDOMNode().value;

    var hotel_style = React.findDOMNode(this.refs.hotel_style);
    hotel_style = $(hotel_style).val();
    var restaurant_regional_cuisine = this.refs.restaurant_regional_cuisine.getDOMNode().checked;
    var drinks_beach_club = this.refs.drinks_beach_club.getDOMNode().checked;

    var timezone = React.findDOMNode(this.refs.timezone);
    timezone = $(timezone).val();
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
      "profile_complete": true,
      "featured_image": featured_imageParse,
      "hotel_image_1": hotel_image_1Parse,
      "hotel_image_2": hotel_image_2Parse,
      "hotel_image_3": hotel_image_3Parse,
      "hotel_image_4": hotel_image_4Parse,
      "hotel_image_5": hotel_image_5Parse,
      "hotel_image_6": hotel_image_6Parse,
      "hotel_image_7": hotel_image_7Parse,
      "hotel_image_8": hotel_image_8Parse,
      "hotel_image_9": hotel_image_9Parse,
      "hotel_image_10": hotel_image_10Parse,
      "hotel_image_11": hotel_image_11Parse,
      "hotel_image_12": hotel_image_12Parse,
      "about_hotel": about_hotel,
      "short_about_hotel": short_about_hotel,
      "address_line_1": hotel_entered_address,
      "address_city": city,
      "address_state": hotel_select_state,
      "latitude": hotel_entered_latitude,
      "longitude": hotel_entered_longitude,
      "location": point,
      "hub_city": hub_city,
      "complimentary_wifi": complimentary_wifi,
      "complimentary_self_parking": complimentary_self_parking,
      "fitness_center": fitness_center,
      "outdoor_pool": outdoor_pool,
      "valet_parking": valet_parking,
      "valet_parking_fee": valet_parking_fee,
      "indoor_pool": indoor_pool,
      "hot_tub": hot_tub,
      "sauna": sauna,
      "beach_access": beach_access,
      "ski_access": ski_access,
      "spa_services": spa_services,
      "restaurant_on_site": restaurant_on_site,
      "bar_on_site": bar_on_site,
      "room_service": room_service,
      "pets_allowed": pets_allowed,
      "phone_checkbox": phone_checkbox,
      "nightly_rate": nightly_rate,
      "taxes": taxes,
      "additional_fees": additional_fees,
      "additional_fees_desc": additional_fees_desc,
      "hotel_style": hotel_style,
      "restaurant_regional_cuisine": restaurant_regional_cuisine,
      "drinks_beach_club": drinks_beach_club,
      "timezone": timezone
    };

    var inc = 1 / 13; //13 images
    inc = inc * 100;
    var counter = 1;

    function incrementProgressBar(counter) {
      var value = inc * counter;
      $("#progressbar").progressbar("option", "value", value);
    };

    featured_imageParse.save().then((function () {
      counter = counter + 1;
      incrementProgressBar(counter);
      hotel_image_1Parse.save().then((function () {
        counter = counter + 1;
        incrementProgressBar(counter);
        hotel_image_2Parse.save().then((function () {
          counter = counter + 1;
          incrementProgressBar(counter);
          hotel_image_3Parse.save().then((function () {
            counter = counter + 1;
            incrementProgressBar(counter);
            hotel_image_4Parse.save().then((function () {
              counter = counter + 1;
              incrementProgressBar(counter);
              hotel_image_5Parse.save().then((function () {
                counter = counter + 1;
                incrementProgressBar(counter);
                hotel_image_6Parse.save().then((function () {
                  counter = counter + 1;
                  incrementProgressBar(counter);
                  hotel_image_7Parse.save().then((function () {
                    counter = counter + 1;
                    incrementProgressBar(counter);
                    hotel_image_8Parse.save().then((function () {
                      counter = counter + 1;
                      incrementProgressBar(counter);
                      hotel_image_9Parse.save().then((function () {
                        counter = counter + 1;
                        incrementProgressBar(counter);
                        hotel_image_10Parse.save().then((function () {
                          counter = counter + 1;
                          incrementProgressBar(counter);
                          hotel_image_11Parse.save().then((function () {
                            counter = counter + 1;
                            incrementProgressBar(counter);
                            hotel_image_12Parse.save().then((function () {
                              counter = counter + 1;
                              incrementProgressBar(counter);
                              //we need to query hotel profile as it already exists
                              var HotelProfile = Parse.Object.extend("hotel_profile");
                              var hotelProfileQuery = new Parse.Query(HotelProfile);
                              hotelProfileQuery.get(hotelId, {
                                success: (function (hotel) {
                                  hotel.save(payload, {
                                    success: (function (completeHotelProfile) {
                                      alert('Successfully created profile!');
                                      counter = counter + 1;
                                      incrementProgressBar();
                                      $("#progressbox").hide();
                                      this.props.profileComplete({ profileComplete: true });
                                    }).bind(this),
                                    error: function error(completeHotelProfile, _error3) {
                                      alert('Failed to create new object, with error code: ' + _error3.message);
                                    }
                                  });
                                }).bind(this),
                                error: function error(hotel, _error2) {
                                  //FIX ME: here and below a msg object text
                                }
                              });
                            }).bind(this), function (error) {
                              alert('There has been an error processing image upload');
                            });
                          }).bind(this), function (error) {
                            alert('There has been an error processing image upload');
                          });
                        }).bind(this), function (error) {
                          alert('There has been an error processing image upload');
                        });
                      }).bind(this), function (error) {
                        alert('There has been an error processing image upload');
                      });
                    }).bind(this), function (error) {
                      alert('There has been an error processing image upload');
                    });
                  }).bind(this), function (error) {
                    alert('There has been an error processing image upload');
                  });
                }).bind(this), function (error) {
                  alert('There has been an error processing image upload');
                });
              }).bind(this), function (error) {
                alert('There has been an error processing image upload');
              });
            }).bind(this), function (error) {
              alert('There has been an error processing image upload');
            });
          }).bind(this), function (error) {
            alert('There has been an error processing image upload');
          });
        }).bind(this), function (error) {
          alert('There has been an error processing image upload');
        });
      }).bind(this), function (error) {
        alert('There has been an error processing image upload');
      });
    }).bind(this), function (error) {
      alert('There has been an error processing image upload');
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid pad-top" },
      React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          null,
          React.createElement("textarea", { ref: "about_hotel", placeholder: "About Hotel...", className: "form-control" }),
          React.createElement("br", null),
          React.createElement("input", { ref: "short_about_hotel", type: "text", placeholder: "Hotel Summary", className: "form-control" }),
          React.createElement("br", null),
          React.createElement("input", { ref: "hotel_entered_address", type: "text", placeholder: "Address Line 1", className: "form-control" }),
          React.createElement("br", null)
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement("input", { ref: "city", type: "text", placeholder: "Address City", className: "form-control" })
            ),
            React.createElement(
              "div",
              { className: "col-xs-6 form-inline" },
              React.createElement(
                "span",
                null,
                "State: "
              ),
              React.createElement(
                "select",
                { ref: "hotel_select_state", className: "form-control" },
                React.createElement(
                  "option",
                  { value: "AL" },
                  "AL"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "AK" },
                  "AK"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "AZ" },
                  "AZ"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "AR" },
                  "AR"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "CA" },
                  "CA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "CO" },
                  "CO"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "CT" },
                  "CT"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "DE" },
                  "DE"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "DC" },
                  "DC"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "FL" },
                  "FL"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "GA" },
                  "GA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "HI" },
                  "HI"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "ID" },
                  "ID"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "IL" },
                  "IL"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "IN" },
                  "IN"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "IA" },
                  "IA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "KS" },
                  "KS"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "KY" },
                  "KY"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "LA" },
                  "LA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "ME" },
                  "ME"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MD" },
                  "MD"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MA" },
                  "MA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MI" },
                  "MI"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MN" },
                  "MN"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MS" },
                  "MS"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MO" },
                  "MO"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "MT" },
                  "MT"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NE" },
                  "NE"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NV" },
                  "NV"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NH" },
                  "NH"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NJ" },
                  "NJ"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NM" },
                  "NM"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NY" },
                  "NY"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "NC" },
                  "NC"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "ND" },
                  "ND"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "OH" },
                  "OH"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "OK" },
                  "OK"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "OR" },
                  "OR"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "PA" },
                  "PA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "RI" },
                  "RI"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "SC" },
                  "SC"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "SD" },
                  "SD"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "TN" },
                  "TN"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "TX" },
                  "TX"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "UT" },
                  "UT"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "VT" },
                  "VT"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "VA" },
                  "VA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "WA" },
                  "WA"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "WV" },
                  "WV"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "WI" },
                  "WI"
                ),
                " ",
                React.createElement(
                  "option",
                  { value: "WY" },
                  "WY"
                )
              )
            )
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "fieldgroup container-fluid" },
          React.createElement(
            "div",
            { className: "well" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-6" },
                React.createElement("input", { ref: "hotel_entered_latitude", type: "text", placeholder: "Latitude", className: "form-control" })
              ),
              React.createElement(
                "div",
                { className: "col-xs-6" },
                React.createElement("input", { ref: "hotel_entered_longitude", type: "text", placeholder: "Longitude", className: "form-control" })
              )
            ),
            React.createElement(
              "a",
              { href: "http://itouchmap.com/latlong.html", target: "_blank" },
              "Use this link if you need assistance"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-8" },
              React.createElement(
                "div",
                { className: "form-inline fieldgroup" },
                React.createElement(
                  "label",
                  null,
                  "Timezone:"
                ),
                React.createElement(
                  "select",
                  { id: "timezone", ref: "timezone", className: "form-control" },
                  React.createElement(
                    "option",
                    { value: "ET" },
                    "Eastern Time - New York, NY USA"
                  ),
                  React.createElement(
                    "option",
                    { value: "CT" },
                    "Central Time - Chicago, IL USA"
                  ),
                  React.createElement(
                    "option",
                    { value: "MT" },
                    "Mountain Time - Denver, CO USA"
                  ),
                  React.createElement(
                    "option",
                    { value: "PT" },
                    "Pacific Time - Los Angeles, CA USA"
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-4" },
              React.createElement(
                "div",
                { className: "fieldgroup form-inline" },
                React.createElement(
                  "label",
                  null,
                  "Hub City:"
                ),
                React.createElement(
                  "select",
                  { ref: "hub_city", className: "form-control", id: "hubCities" },
                  React.createElement(
                    "option",
                    { val: "-" },
                    " - "
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "form-inline pad-top" },
          React.createElement(
            "label",
            null,
            "Hotel Style:"
          ),
          React.createElement(
            "select",
            { id: "hotel_style", ref: "hotel_style", className: "form-control" },
            React.createElement(
              "option",
              { value: "-" },
              "-"
            ),
            React.createElement(
              "option",
              { value: "GLAM" },
              "GLAM"
            ),
            React.createElement(
              "option",
              { value: "LUX" },
              "LUX"
            ),
            React.createElement(
              "option",
              { value: "HIP" },
              "HIP"
            ),
            React.createElement(
              "option",
              { value: "REFINED" },
              "REFINED"
            ),
            React.createElement(
              "option",
              { value: "SOUND" },
              "SOUND"
            ),
            React.createElement(
              "option",
              { value: "BASIC" },
              "BASIC"
            )
          )
        ),
        React.createElement(
          "p",
          null,
          "Amenities"
        ),
        React.createElement(
          "div",
          { className: "form-inline" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "complimentary_wifi", type: "checkbox" }),
                  " Complimentary Wifi"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "complimentary_self_parking", type: "checkbox" }),
                  " Complimentary self-parking"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "fitness_center", type: "checkbox" }),
                  " Fitness Center"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "outdoor_pool", type: "checkbox" }),
                  " Outdoor Pool"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "valet_parking", type: "checkbox" }),
                  " Valet Parking"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "valet_parking_fee", type: "checkbox" }),
                  " Valet Parking Fee"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "indoor_pool", type: "checkbox" }),
                  " Indoor Pool"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "hot_tub", type: "checkbox" }),
                  " Hot Tub"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "sauna", type: "checkbox" }),
                  " Sauna"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "beach_access", type: "checkbox" }),
                  " Beach Access"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "ski_access", type: "checkbox" }),
                  " Ski Access"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "spa_services", type: "checkbox" }),
                  " Spa Services"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "restaurant_on_site", type: "checkbox" }),
                  " Restaurant on Site"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "bar_on_site", type: "checkbox" }),
                  " Bar on Site"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "room_service", type: "checkbox" }),
                  " Room Service"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { ref: "pets_allowed", type: "checkbox" }),
                  " Pets Allowed"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { placeholder: "Phone", ref: "phone_checkbox", type: "checkbox" }),
                  " Phone"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { value: "Restaurant serves Regional Cuisine", ref: "restaurant_regional_cuisine", type: "checkbox" }),
                  " Restaurant serves Regional Cuisine"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                  "label",
                  null,
                  React.createElement("input", { value: "Drinks served at the Beach Club", ref: "drinks_beach_club", type: "checkbox" }),
                  " Drinks served at the Beach Club"
                )
              )
            ),
            React.createElement("div", { className: "col-xs-6" })
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-4 col-md-4 form-inline" },
            React.createElement(
              "label",
              null,
              "Nightly Rate"
            ),
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement(
                "span",
                { className: "input-group-addon" },
                "$"
              ),
              React.createElement("input", { type: "text", className: "form-control nightly-rate", placeholder: "Nightly Rate", ref: "nightly_rate" }),
              React.createElement(
                "span",
                { className: "input-group-addon" },
                ".00"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-md-4 form-inline" },
            React.createElement(
              "label",
              null,
              "Taxes:"
            ),
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement("input", { placeholder: "Taxes", ref: "taxes", type: "text", className: "form-control" }),
              React.createElement(
                "span",
                { className: "input-group-addon" },
                "%"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-md-4 form-inline" },
            React.createElement(
              "label",
              null,
              "Additional Fees"
            ),
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement(
                "span",
                { className: "input-group-addon" },
                "$"
              ),
              React.createElement("input", { placeholder: "Additional Fees", ref: "additional_fees", type: "text", className: "form-control" }),
              React.createElement(
                "span",
                { className: "input-group-addon" },
                ".00"
              )
            )
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-4" },
            React.createElement(
              "label",
              null,
              "Additional Fees Description"
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-8" },
            React.createElement("input", { ref: "additional_fees_desc", type: "text", className: "form-control" })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "alert alert-warning", role: "alert" },
          React.createElement("span", { className: "glyphicon glyphicon-info-sign", "aria-hidden": "true" }),
          " Make sure your images are saved at 640 pixels width and 520 pixels height at 72 pixels per inch in .jpg format"
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "alert alert-info", role: "alert" },
          React.createElement("span", { className: "glyphicon glyphicon-info-sign", "aria-hidden": "true" }),
          " You will see a preview of the image. Your images will be uploaded when you submit the entire form."
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Featured Image"
          ),
          React.createElement("input", { ref: "featured_image", type: "file", id: "featured_image", className: "form-control" }),
          React.createElement("img", { "data-id": "featured_image" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 1"
          ),
          React.createElement("input", { ref: "hotel_image_1", type: "file", id: "hotel_image_1", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_1" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 2"
          ),
          React.createElement("input", { ref: "hotel_image_2", type: "file", id: "hotel_image_2", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_2" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 3"
          ),
          React.createElement("input", { ref: "hotel_image_3", type: "file", id: "hotel_image_3", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_3" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 4"
          ),
          React.createElement("input", { ref: "hotel_image_4", type: "file", id: "hotel_image_4", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_4" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 5"
          ),
          React.createElement("input", { ref: "hotel_image_5", type: "file", id: "hotel_image_5", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_5" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 6"
          ),
          React.createElement("input", { ref: "hotel_image_6", type: "file", id: "hotel_image_6", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_6" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 7"
          ),
          React.createElement("input", { ref: "hotel_image_7", type: "file", id: "hotel_image_7", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_7" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 8"
          ),
          React.createElement("input", { ref: "hotel_image_8", type: "file", id: "hotel_image_8", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_8" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 9"
          ),
          React.createElement("input", { ref: "hotel_image_9", type: "file", id: "hotel_image_9", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_9" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 10"
          ),
          React.createElement("input", { ref: "hotel_image_10", type: "file", id: "hotel_image_10", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_10" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 11"
          ),
          React.createElement("input", { ref: "hotel_image_11", type: "file", id: "hotel_image_11", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_11" })
        ),
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "label",
            null,
            "Hotel Image 12"
          ),
          React.createElement("input", { ref: "hotel_image_12", type: "file", id: "hotel_image_12", className: "form-control" }),
          React.createElement("img", { "data-id": "hotel_image_12" })
        ),
        React.createElement(
          "button",
          { onClick: this.submitHotelProfile, className: "btn btn-success" },
          "Create Profile"
        ),
        React.createElement(
          "button",
          { className: "btn btn-danger" },
          "Cancel"
        ),
        React.createElement(
          "button",
          { className: "btn btn-warning" },
          "Clear"
        ),
        React.createElement(
          "div",
          { id: "progressbox" },
          React.createElement(
            "p",
            null,
            "Creating Profile..."
          ),
          React.createElement("div", { id: "progressbar" })
        )
      )
    );
  }
});