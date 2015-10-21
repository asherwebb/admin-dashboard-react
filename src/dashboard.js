var Dashboard = React.createClass({
	getInitialState: function(){
		return {
			data:[], isAdmin:false, creatingUser: false, editingUserProfile: false, viewHotelDashboard: false, displaySettings:false
		};
	},
	userCreatedUpdate: function(userData){
		var data = [];
	 	var currentItems = this.state.data;
	 	data = currentItems;
		data.unshift(userData);
		this.setState({data: data});
	},
	userRemovedUpdate: function(hotel){
		var hotelId = hotel.id;
		alert(hotelId);
		//hotel should contain hotel object id
		//get this.state.data
		//find hotel to remove by key
		//pop that index out of the array
		//set state with new array as data
	},
	componentWillMount: function() {
		var query = new Parse.Query( Parse.User );
		query.equalTo( "isAdmin", true );
		query.find( {
	  		success: function( admins ) {
	  			for( var i=0; i<admins.length; i++ ){
	  				if( admins[i].id === Parse.User.current().id ){
	  				this.setState( {isAdmin:true} );
	  				}
	  			}
  			}.bind(this)
		});

		var data = [];
		var userHotelLink = [];
		var mergedHotelUserData = [];
		var allUsers = new Parse.Query( Parse.User );

		allUsers.notEqualTo( "isAdmin", true );
		allUsers.find( {
			success:function( items ){
			for( var i=0; i<items.length; i++ ){
				var userData = {};
				userData.uid = items[i].id;
				userData.email = items[i].get( 'email' );
				userData.username = items[i].get( 'username' );
				data.push(userData);
				userHotelLink.push(userData.uid);
			};

			//extend user data objects to include hotel data objects in new array
			var HotelQuery = new Parse.Object.extend( "hotel_profile" );
				var hotelQuery = new Parse.Query( HotelQuery );
				hotelQuery.containedIn( "user_key" , userHotelLink );
				hotelQuery.find( {
					success: function(results){
						var hotelMatchItems = results;
						var arrayMatchData = hotelMatchItems.map(function(object){

							var rObj = {};
							//? .isActive to not display hotels not active
							rObj.isActive = object.get("isActive");
							rObj.createdAt = object.createdAt;
							rObj.hotelUserKey = object.get('user_key');
							rObj.hotelId = object.id;
							rObj.profileComplete = object.get('profile_complete');
							rObj.hotelName = object.get('hotel_name');
							return rObj;
						});

						var orderedHotelProfileDataSetArray = _.sortBy(arrayMatchData, 'createdAt');
						var orderedUserProfileDataSetArray = _.sortBy(data, 'createdAt');

						//console.log(orderedHotelProfileDataSetArray);

						mergedHotelUserData = orderedUserProfileDataSetArray.map( function( item, i ) {
							var mObj = {};
							mObj = _.extend( item, orderedHotelProfileDataSetArray[i] );
							console.log(mObj);
							if( mObj.isActive ===false ){
								return null;
							}else{
								return mObj;
							}
						});
						//reverse to display createdAt order descending
						mergedHotelUserData = mergedHotelUserData.reverse();	
						//console.log(mergedHotelUserData);		
						mergedHotelUserData = _.compact( mergedHotelUserData );
						this.setState({data:mergedHotelUserData});						
					}.bind( this ),
					error: function(){

					}
				});
				
			}.bind(this)
			});

	},
	renderCreateUserBox: function() {
		this.setState( {creatingUser:true} );
	},
	creatingUser: function( display ){
		//? display should be true or false ?
		this.setState( {creatingUser:display} );

	},
	displaySettings: function(){
		this.setState({displaySettings: true});
	},
	logout: function(){
		Parse.User.logOut().then( function( results ){
		this.props.filter( {loggedIn: false} );
		}.bind( this ));
	},
	render: function(){	
			//FIX ME: duplicate key issue check users and hotel
		var hotelUserNodes = this.state.data.map( function ( user ) {
      	return (
        	<HotelUser hotelId={user.hotelId} username={user.username} key={user.uid} objId={user.uid} email={user.email} profileComplete={user.profileComplete} hotelName={user.hotelName} />
      		);
    	});

		var isManagingSettings = this.state.displaySettings ? <SettingsBox /> : '';

		var isAdmin = this.state.isAdmin ? 
			<div>
				<p>Welcome SwingShift Admin <button onClick={this.logout} className="btn btn-danger pull-right">Logout</button>	</p>
				<button disabled={this.state.creatingUser} onClick={this.renderCreateUserBox} className="btn btn-primary" ><span className="glyphicon glyphicon-plus" ></span> Create User</button><button className="btn btn-info mg-settings" onClick={this.displaySettings} ><span className="glyphicon glyphicon-option-horizontal" ></span> Manage Settings</button>
				<h3 className="bg-primary">Current Hotel Users </h3>
				{hotelUserNodes}
			</div> : 
			<div>
				<p>Welcome SwingShift Hotel Member <button onClick={this.logout} className="btn btn-danger">Logout</button>	</p>
				<button>Profile</button>
				<button>View Dashboard</button>
			</div>;

		var isCreatingUser = this.state.creatingUser ? <CreateUserBox isActive={this.creatingUser} userCreatedUpdate={this.userCreatedUpdate} data={this.state.data} /> : '';
		return(
			<div className="jumbotron padding-left container">
				{isCreatingUser}
				{isManagingSettings}
				{isAdmin}	
			</div>
		);
	}
});