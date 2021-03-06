var HotelUser = React.createClass({
	getInitialState: function() {
   		return {
	   		profileComplete: false,
	   		creatingProfile: false,
        profileDeleted: false,
        isActive: false,
        viewProfile: false,
        viewProfileBtnText: 'View Profile',
        viewProfileBtnClassName: "btn btn-info",
        viewBtnGlyphicon: "glyphicon glyphicon-eye-open",
   		}
   	},
   	componentWillMount: function() {
   		if( this.props.profileComplete ) {
   			this.setState( { profileComplete: true } );
   		}

      this.setState( { isActive: this.props.isActive } );
   	},
    profileCompleted: function( confirmation ) {
      if( confirmation ) {
        this.setState( { profileComplete: true, creatingProfile: false } );
      };
    },
   	createProfile: function() {
   		this.setState( { creatingProfile: true } );
   	},
    viewProfileToggle: function(e) {
      e.preventDefault();
      if( !this.state.viewProfile ) {
          this.setState( {viewProfile: true,
                          viewProfileBtnText: 'Close', 
                          viewBtnGlyphicon: "glyphicon glyphicon-remove-circle", 
                          viewProfileBtnClassName: "btn btn-warning"
                        } );
      } else {
        this.setState( {viewProfile: false, 
                        viewProfileBtnText: 'View Profile',
                        viewProfileBtnClassName: "btn btn-info", 
                        viewBtnGlyphicon: "glyphicon glyphicon-eye-open"
                      } );
      }
    },
   	notCreateProfile: function( hideForm ){
   		this.setState( { creatingProfile:false } );
   	},
    removeHotel: function(e){
      e.preventDefault();
      if ( window.confirm( "Delete Hotel Profile?" ) ) { 
            var hotelId = this.props.hotelId;
            var HotelQuery = Parse.Object.extend( 'hotel_profile' );
            var hotelQuery = new Parse.Query( HotelQuery );
            hotelQuery.get( hotelId , {
                  success: function( hotel ) {
                    hotel.save( { "isActive": false }, {
                      success: function( hotel ){
                        //FIX ME: we could remove the hotel from data in state an re-render
                        alert( 'Hotel deleted' );
                        $( "#"+hotelId ).fadeOut();
                      }.bind(this),
                      error: function( hotel, error ){
                        alert( 'Error: Hotel unable to be deleted' );
                      }.bind(this)
                    });
                  }.bind(this),
                  error: function( hotel, error ){
                    alert( 'Error: Hotel unable to be deleted' );
                  }.bind(this)
            });
      }           

    },
	render: function() {
      var viewProfileView = this.state.viewProfile ? 
        <ProfileBox hotelId={this.props.hotelId} hotelName={this.props.hotelName} viewState={this.toggleState} /> 
        : 
        '';

  		var createBtnStatus = this.state.creatingProfile ? true : false;

  		var profileButton = this.state.profileComplete ? 
        <button className={this.state.viewProfileBtnClassName} onClick={this.viewProfileToggle} >
          <span className={this.state.viewBtnGlyphicon}></span> 
          {this.state.viewProfileBtnText}
        </button> 
        : 
        <button onClick={this.createProfile} className="btn btn-warning" disabled={createBtnStatus} >
        <span className="glyphicon glyphicon-flash"></span> 
          Create Profile
        </button>;  

  		var createProfileView = this.state.creatingProfile ? 
        <CreateHotelProfile displayForm={this.notCreateProfile} hotelId={this.props.hotelId} profileComplete={this.profileCompleted} /> 
        :  
        '';
  		var closeProfileBtn = this.state.creatingProfile ? 
        <button onClick={this.notCreateProfile} className="btn btn-danger">Cancel</button> 
        : 
        '';

    	return (
     		<div className="panel panel-default" id={this.props.hotelId} >
     			<div className="panel-body">
        		<div>
              <h4 className="percent-eighty">{this.props.hotelName} <small>{this.props.username} - {this.props.email}</small> </h4>
              <div className="pull-right percent-fifteen">
                <button id={this.props.hotelId} className="btn btn-small btn-danger pull-right" onClick={this.removeHotel} >
                <span className="glyphicon glyphicon-trash"></span> 
                Delete</button>
              </div>
            </div>
        		<hr className="clearfix" />
            {profileButton}
        		{closeProfileBtn}
        		{createProfileView}
            {viewProfileView}
        </div>
      </div>
    	);
  	}
});