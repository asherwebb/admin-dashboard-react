var HotelUser = React.createClass({
	getInitialState: function(){
   		return {
	   		profileComplete:false,
	   		creatingProfile:false
   		}
   	},
   	componentWillMount: function(){
   		if(this.props.profileComplete){
   			this.setState({profileComplete:true});
   		}
   	},
   	createProfile: function(){
   		this.setState({creatingProfile: true});
   	},
   	notCreateProfile: function(hideForm){
   		this.setState({creatingProfile:false});
   	},
	render: function() {
  		var createBtnStatus = this.state.creatingProfile ? true : false;
  		var profileButton = this.state.profileComplete ? <button>view profile</button> : <button onClick={this.createProfile} className="btn btn-info" disabled={createBtnStatus} >Create Profile</button>;   
  		var createProfileView = this.state.creatingProfile ? <CreateHotelProfile displayForm={this.notCreateProfile} hotelId={this.props.hotelId}  /> :  '';
  		var closeProfileBtn = this.state.creatingProfile ? <button onClick={this.notCreateProfile} className="btn btn-danger">Cancel</button> : '';
    	return (
     		<div className="panel panel-default">
     			<div className="panel-body">
        		<h4>{this.props.hotelName} <small>{this.props.username} - {this.props.email}</small> </h4>
        		{profileButton}
        		{closeProfileBtn}
        		{createProfileView}
        		</div>
      		</div>
    	);
  	}
});