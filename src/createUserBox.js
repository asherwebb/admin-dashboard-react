var CreateUserBox = React.createClass({
	cancelNewUser: function(){
		this.props.isActive(false);
	},
	createNewUser: function(){
		var username = this.refs.newUsername.getDOMNode().value;
		var pass = this.refs.createUserPassword.getDOMNode().value;
		var email = this.refs.createUserEmail.getDOMNode().value;
		var phone = this.refs.createUserPhone.getDOMNode().value;
		var hotel_name = this.refs.createUserHotelName.getDOMNode().value;
		var user = new Parse.User();
		user.set( "username", username );
		user.set( "password", pass );
		user.set("email", email);
		user.set("hotel_name", hotel_name);
		user.set("phone", phone);
		user.signUp(null, {
	  		success: function(user) {
	  			//FIX ME: remove this and hotel profile alert into 1 progress bar
	  			alert('user sign up success');
	  			var user_key = user.id;
	  			var userCreatedAt = user.createdAt;
	  			//create a new hotel profile object with the hotel name and a link to the user
	  			var HotelProfile = Parse.Object.extend("hotel_profile");
	  			var hotelProfile = new HotelProfile();
	  			var parseUser = Parse.User.current();
	  			var payload = {
	  				"hotel_name" : hotel_name,
	  				"user_key" : user_key,
	  				"linked_username": username,
	  				"user": parseUser,
	  				"profile_complete": false
	  			}

				hotelProfile.save( payload, {
					success: function( hotelProfile ){
						//FIX ME:
						//grab the hotel profile id and store will need to ref in profile form where we get created profile to update
	  					alert('New user has been created and a verification email has been sent!');
		  				
		  				//optimistic ui update		  				
		  				var userData = {
			  				profileComplete: false,
			  				uid:user_key,
			  				email: email,
			  				hotelName: hotel_name,
			  				hotelId: hotelProfile.id,
			  				username:username,
			  				createdAt: userCreatedAt
		  				};		  				

						var data = localStorage.getItem('data');
						data = JSON.parse(data);
						var storedPass = data.pass;
						var storedUsername = data.username;
						//now re-login as admin, the react isLoggedin status never changed
						Parse.User.logIn( storedUsername, storedPass, {
  							success: function(login) {	
  								this.props.userCreatedUpdate(userData);	
  							}.bind(this),
  							error: function(error) {
  								alert('User Authorization Error');
  							}
						});
					this.props.isActive();
						
					}.bind(this),
					error: function(hotelProfile, error){
				 		alert('Failed to create new object, with error code: ' + error.message);
					}
				});
	  		}.bind(this),
	  		error: function(user, error) {
	    		alert("Error: " + error.code + " " + error.message);
	  		}
		});
		return false;
	},
	render: function(){		
		return(
			<div className="panel panel-default">
				<h2 className="left-margin-100">Create New User Form</h2>
				<form id="create-user-form">
					<input type="text" ref="newUsername" placeholder="New Username" className="form-control input-margin" required /><br />
					<input type="email" ref="createUserEmail" placeholder="New User Email" className="form-control input-margin" required /><br />
					<input type="password" ref="createUserPassword" placeholder="New User Password" className="form-control input-margin" required /><br />
					<input type="text" ref="createUserPhone" placeholder="New User Phone" className="form-control input-margin" required /><br />
					<input type="text" ref="createUserHotelName" placeholder="Enter name of hotel this user will administer" className="form-control input-margin" required /><br />
					<div>	
					<button onClick={this.cancelNewUser} className="btn btn-danger delete-user-btn btn-small" > Cancel <span class="glyphicon glyphicon-remove-circle"></span></button>
					<button onClick={this.createNewUser} className="btn btn-success btn-large" > Submit </button>
					</div>
				</form>
			</div>
		);
	}
});