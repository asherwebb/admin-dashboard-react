var HotelUser = React.createClass({
	getInitialState: function(){
   		return {
	   		profileComplete:false,
	   		creatingProfile:false,
        profileDeleted:false
   		}
   	},
   	componentWillMount: function(){
   		if(this.props.profileComplete){
   			this.setState({profileComplete:true});
   		}
   	},
    profileCompleted: function(confirmation){
      if(confirmation){
        this.setState({profileComplete: true, creatingProfile:false});
      };
    },
   	createProfile: function(){
   		this.setState({creatingProfile: true});
   	},
   	notCreateProfile: function(hideForm){
   		this.setState({creatingProfile:false});
   	},
    removeHotel: function(e){
      e.preventDefault();
      //get by this.props.hotelId from parse hotel profile object
      var hotelId = this.props.objId;
      console.log('hotel id: ' + hotelId);
      var HotelQuery = Parse.Object.extend('hotel_profile');
      var hotelQuery = new Parse.Query(HotelQuery);
      hotelQuery.get( hotelId , {
            success: function(hotel) {
              hotel.save({"isActive":false}, {
                success: function(hotel){
                  //pass data back up the stat chain to re-render
                  alert('hotel has been deleted');
                  $("#"+hotelId).fadeOut();
                  //this.props.deletedHotel({id:hotelId});
                }.bind(this),
                error: function(hotel, error){
                  alert('error: hotel unable to be deleted');
                }.bind(this)
              });
            }.bind(this),
            error: function(hotel, error){
              alert('remove hotel error');
            }.bind(this)
      });
    },
	render: function() {
  		var createBtnStatus = this.state.creatingProfile ? true : false;
  		var profileButton = this.state.profileComplete ? <button className="btn btn-info" ><span className="glyphicon glyphicon-eye-open"></span> View profile</button> : <button onClick={this.createProfile} className="btn btn-warning" disabled={createBtnStatus} ><span className="glyphicon glyphicon-flash"></span> Create Profile</button>;   
  		var createProfileView = this.state.creatingProfile ? <CreateHotelProfile displayForm={this.notCreateProfile} hotelId={this.props.hotelId} profileComplete={this.profileCompleted} /> :  '';
  		var closeProfileBtn = this.state.creatingProfile ? <button onClick={this.notCreateProfile} className="btn btn-danger">Cancel</button> : '';
    	return (
     		<div className="panel panel-default" id={this.props.hotelId} >
     			<div className="panel-body">
        		<div><h4 className="percent-eighty">{this.props.hotelName} <small>{this.props.username} - {this.props.email}</small> </h4><div className="pull-right percent-fifteen"><button id={this.props.hotelId} className="btn btn-small btn-danger pull-right" onClick={this.removeHotel} ><span className="glyphicon glyphicon-trash"></span> Delete</button></div></div>
        		<hr className="clearfix" />
            {profileButton}
        		{closeProfileBtn}
        		{createProfileView}
        		</div>
      		</div>
    	);
  	}
});