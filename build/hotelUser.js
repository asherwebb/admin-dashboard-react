"use strict";

var HotelUser = React.createClass({
  displayName: "HotelUser",

  getInitialState: function getInitialState() {
    return {
      profileComplete: false,
      creatingProfile: false,
      profileDeleted: false,
      isActive: false,
      viewProfile: false,
      viewProfileBtnText: 'View Profile',
      viewProfileBtnClassName: "btn btn-info",
      viewBtnGlyphicon: "glyphicon glyphicon-eye-open"
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.profileComplete) {
      this.setState({ profileComplete: true });
    }

    this.setState({ isActive: this.props.isActive });
  },
  profileCompleted: function profileCompleted(confirmation) {
    if (confirmation) {
      this.setState({ profileComplete: true, creatingProfile: false });
    };
  },
  createProfile: function createProfile() {
    this.setState({ creatingProfile: true });
  },
  viewProfileToggle: function viewProfileToggle(e) {
    e.preventDefault();
    if (!this.state.viewProfile) {
      this.setState({ viewProfile: true,
        viewProfileBtnText: 'Close',
        viewBtnGlyphicon: "glyphicon glyphicon-remove-circle",
        viewProfileBtnClassName: "btn btn-warning"
      });
    } else {
      this.setState({ viewProfile: false,
        viewProfileBtnText: 'View Profile',
        viewProfileBtnClassName: "btn btn-info",
        viewBtnGlyphicon: "glyphicon glyphicon-eye-open"
      });
    }
  },
  notCreateProfile: function notCreateProfile(hideForm) {
    this.setState({ creatingProfile: false });
  },
  removeHotel: function removeHotel(e) {
    e.preventDefault();
    if (window.confirm("Delete Hotel Profile?")) {
      var hotelId = this.props.hotelId;
      var HotelQuery = Parse.Object.extend('hotel_profile');
      var hotelQuery = new Parse.Query(HotelQuery);
      hotelQuery.get(hotelId, {
        success: (function (hotel) {
          hotel.save({ "isActive": false }, {
            success: (function (hotel) {
              //FIX ME: we could remove the hotel from data in state an re-render
              alert('Hotel deleted');
              $("#" + hotelId).fadeOut();
            }).bind(this),
            error: (function (hotel, error) {
              alert('Error: Hotel unable to be deleted');
            }).bind(this)
          });
        }).bind(this),
        error: (function (hotel, error) {
          alert('Error: Hotel unable to be deleted');
        }).bind(this)
      });
    }
  },
  render: function render() {
    var viewProfileView = this.state.viewProfile ? React.createElement(ProfileBox, { hotelId: this.props.hotelId, hotelName: this.props.hotelName, viewState: this.toggleState }) : '';

    var createBtnStatus = this.state.creatingProfile ? true : false;

    var profileButton = this.state.profileComplete ? React.createElement(
      "button",
      { className: this.state.viewProfileBtnClassName, onClick: this.viewProfileToggle },
      React.createElement("span", { className: this.state.viewBtnGlyphicon }),
      this.state.viewProfileBtnText
    ) : React.createElement(
      "button",
      { onClick: this.createProfile, className: "btn btn-warning", disabled: createBtnStatus },
      React.createElement("span", { className: "glyphicon glyphicon-flash" }),
      "Create Profile"
    );

    var createProfileView = this.state.creatingProfile ? React.createElement(CreateHotelProfile, { displayForm: this.notCreateProfile, hotelId: this.props.hotelId, profileComplete: this.profileCompleted }) : '';
    var closeProfileBtn = this.state.creatingProfile ? React.createElement(
      "button",
      { onClick: this.notCreateProfile, className: "btn btn-danger" },
      "Cancel"
    ) : '';

    return React.createElement(
      "div",
      { className: "panel panel-default", id: this.props.hotelId },
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            { className: "percent-eighty" },
            this.props.hotelName,
            " ",
            React.createElement(
              "small",
              null,
              this.props.username,
              " - ",
              this.props.email
            ),
            " "
          ),
          React.createElement(
            "div",
            { className: "pull-right percent-fifteen" },
            React.createElement(
              "button",
              { id: this.props.hotelId, className: "btn btn-small btn-danger pull-right", onClick: this.removeHotel },
              React.createElement("span", { className: "glyphicon glyphicon-trash" }),
              "Delete"
            )
          )
        ),
        React.createElement("hr", { className: "clearfix" }),
        profileButton,
        closeProfileBtn,
        createProfileView,
        viewProfileView
      )
    );
  }
});