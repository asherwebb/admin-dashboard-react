'use strict';

var HotelUser = React.createClass({
  displayName: 'HotelUser',

  getInitialState: function getInitialState() {
    return {
      profileComplete: false,
      creatingProfile: false,
      profileDeleted: false,
      isActive: this.props.isActive,
      viewProfile: false
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.isActive === false) {}

    if (this.props.profileComplete) {
      this.setState({ profileComplete: true });
    }
  },
  profileCompleted: function profileCompleted(confirmation) {
    if (confirmation) {
      this.setState({ profileComplete: true, creatingProfile: false });
    };
  },
  createProfile: function createProfile() {
    this.setState({ creatingProfile: true });
  },
  viewProfile: function viewProfile(e) {
    e.preventDefault();
    this.setState({ viewProfile: true });
  },
  notCreateProfile: function notCreateProfile(hideForm) {
    this.setState({ creatingProfile: false });
  },
  removeHotel: function removeHotel(e) {
    e.preventDefault();
    if (window.confirm("Delete Hotel Profile?")) {
      //get by this.props.hotelId from parse hotel profile object
      var hotelId = this.props.hotelId;
      console.log('hotel id: ' + hotelId);
      var HotelQuery = Parse.Object.extend('hotel_profile');
      var hotelQuery = new Parse.Query(HotelQuery);
      hotelQuery.get(hotelId, {
        success: (function (hotel) {
          hotel.save({ "isActive": false }, {
            success: (function (hotel) {
              //pass data back up the stat chain to re-render
              alert('hotel has been deleted');
              $("#" + hotelId).fadeOut();
            }).bind(this),
            error: (function (hotel, error) {
              alert('error: hotel unable to be deleted');
            }).bind(this)
          });
        }).bind(this),
        error: (function (hotel, error) {
          alert('remove hotel error');
        }).bind(this)
      });
    }
  },
  render: function render() {
    var viewProfileView = this.state.viewProfile ? React.createElement(ProfileBox, { hotelId: this.props.hotelId, hotelName: this.props.hotelName }) : '';
    var createBtnStatus = this.state.creatingProfile ? true : false;
    var profileButton = this.state.profileComplete ? React.createElement(
      'button',
      { className: 'btn btn-info', onClick: this.viewProfile },
      React.createElement('span', { className: 'glyphicon glyphicon-eye-open' }),
      ' View profile'
    ) : React.createElement(
      'button',
      { onClick: this.createProfile, className: 'btn btn-warning', disabled: createBtnStatus },
      React.createElement('span', { className: 'glyphicon glyphicon-flash' }),
      ' Create Profile'
    );
    var createProfileView = this.state.creatingProfile ? React.createElement(CreateHotelProfile, { displayForm: this.notCreateProfile, hotelId: this.props.hotelId, profileComplete: this.profileCompleted }) : '';
    var closeProfileBtn = this.state.creatingProfile ? React.createElement(
      'button',
      { onClick: this.notCreateProfile, className: 'btn btn-danger' },
      'Cancel'
    ) : '';
    return React.createElement(
      'div',
      { className: 'panel panel-default', id: this.props.hotelId },
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'h4',
            { className: 'percent-eighty' },
            this.props.hotelName,
            ' ',
            React.createElement(
              'small',
              null,
              this.props.username,
              ' - ',
              this.props.email
            ),
            ' '
          ),
          React.createElement(
            'div',
            { className: 'pull-right percent-fifteen' },
            React.createElement(
              'button',
              { id: this.props.hotelId, className: 'btn btn-small btn-danger pull-right', onClick: this.removeHotel },
              React.createElement('span', { className: 'glyphicon glyphicon-trash' }),
              ' Delete'
            )
          )
        ),
        React.createElement('hr', { className: 'clearfix' }),
        profileButton,
        closeProfileBtn,
        createProfileView,
        viewProfileView
      )
    );
  }
});