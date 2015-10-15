"use strict";

var HotelUser = React.createClass({
  displayName: "HotelUser",

  getInitialState: function getInitialState() {
    return {
      profileComplete: false,
      creatingProfile: false
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.profileComplete) {
      this.setState({ profileComplete: true });
    }
  },
  createProfile: function createProfile() {
    this.setState({ creatingProfile: true });
  },
  notCreateProfile: function notCreateProfile(hideForm) {
    this.setState({ creatingProfile: false });
  },
  render: function render() {
    var createBtnStatus = this.state.creatingProfile ? true : false;
    var profileButton = this.state.profileComplete ? React.createElement(
      "button",
      null,
      "view profile"
    ) : React.createElement(
      "button",
      { onClick: this.createProfile, className: "btn btn-info", disabled: createBtnStatus },
      "Create Profile"
    );
    var createProfileView = this.state.creatingProfile ? React.createElement(CreateHotelProfile, { displayForm: this.notCreateProfile, hotelId: this.props.objId }) : '';
    var closeProfileBtn = this.state.creatingProfile ? React.createElement(
      "button",
      { onClick: this.notCreateProfile, className: "btn btn-danger" },
      "Cancel"
    ) : '';
    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
          "h4",
          null,
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
        profileButton,
        closeProfileBtn,
        createProfileView
      )
    );
  }
});