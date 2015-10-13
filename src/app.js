var HotelUser = React.createClass({
   getInitialState: function(){
   	return {
   		profileComplete:false,
   		creatingProfile:false
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
  	var profileButton = this.state.profileComplete ? <button>view profile</button> : <button onClick={this.createProfile} disabled={createBtnStatus} >create profile</button>;   
  	var createProfileView = this.state.creatingProfile ? <CreateHotelProfile displayForm={this.notCreateProfile} hotelId={this.props.objId}  /> :  '';
  	var x = this.state.creatingProfile ? <button onClick={this.notCreateProfile}>Close</button> : '';
    return (
      <div>
      
        <h2>
          {this.props.username}         
        {this.props.objId}
        </h2>
        {profileButton}
        <br />
        {x}
        {createProfileView}
      </div>
    );
  }
});
var CreateUserBox = React.createClass({
	componentWillMount: function(){
	},
	createNewUser: function(){
		var username = this.refs.newUsername.getDOMNode().value;
		var pass = this.refs.createUserPassword.getDOMNode().value;
		var email = this.refs.createUserEmail.getDOMNode().value;
		var phone = this.refs.createUserPhone.getDOMNode().value;
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", pass);
		user.set("email", email);
		user.set("phone", phone);
		user.signUp(null, {
	  		success: function(user) {
	  			this.props.data = this.props.data.push(username);
	  			alert('New user has been created and a verification email has been sent!');
		  		//Now the current parse user is set to the newly signed up user lets grab initial auth info
				var data = localStorage.getItem('data');
				data = JSON.parse(data);
				var storedPass = data.pass;
				var storedUsername = data.username;
				//now re-login as admin, the react isLoggedin status never changed
				Parse.User.logIn( storedUsername, storedPass, {
  					success: function(login) {		
  					}.bind(this),
  					error: function(error) {
  						alert('User Authorization Error');
  					}
				});
				this.props.isActive();
	  		}.bind(this),
	  		error: function(user, error) {
	    	// Show the error message somewhere and let the user try again.
	    		alert("Error: " + error.code + " " + error.message);
	  		}
		});
		return false;
	},
	render: function(){		
		return(
			<div>
				<form>
					<input type="text" ref="newUsername" placeholder="New Username" required/>
					<input type="email" ref="createUserEmail" placeholder="New User Email" required/>
					<input type="password" ref="createUserPassword" placeholder="New User Password" required/>
					<input type="text" ref="createUserPhone" placeholder="New User Phone" required/>
					<button onClick={this.createNewUser}> Submit </button>
				</form>
			</div>
		);
	}
});

var LoginForm = React.createClass({
	getInitialState: function(){
		return {
			counter:0
		};		
	},
	increment: function() {
        this.setState({ counter: this.state.counter+1 });
    },
	processLogin: function(){
		if (this.state.counter === 10){
			alert('Too many login attempts. Your account has been suspended please contact support.');
			//set a cookie here to see if user is locked out
			return;
		};		
		var username = this.refs.username.getDOMNode().value;
		var pass = this.refs.pass.getDOMNode().value;	

		//store ls cookie to allow admin to re-login after new user sign up Parse login wierdness
		localStorage.setItem('data', JSON.stringify({pass:pass, username:username}));

		Parse.User.logIn( username, pass, {
  			success: function(login) {
	  			this.props.filter({ loggedIn:true });
  			}.bind(this),
  			error: function(error) {
  			alert('Invalid Login');
  			$('#username').val('');
  			$('#pass').val('');
  			$('#login').blur();
	   		this.props.filter({loggedIn: false});
  			}.bind(this)
		});
		return false;
	},
	render: function(){
		return( 
			<div>
				<h2>Login</h2>	
				<form onSubmit={this.processLogin} >
     				<div className="center-400w">
        				<input type="text" placeholder="Enter your username" id="username" ref="username" className="form-control input-margin" required/>
        				<input type="password" placeholder="Enter your password" id="pass" ref="pass" className="form-control input-margin" required/>
        				<input type="submit" id="login" value="Login" className="btn btn-primary" onClick={this.increment} />
        			</div>
      			</form>				
			</div>
		);
	}
});

var Dashboard = React.createClass({
	getInitialState: function(){
		return {
			data:[],
			isAdmin:false,
			creatingUser: false,
			editingUserProfile: false,
			viewHotelDashboard: false
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(Parse.User);
		query.equalTo("isAdmin", true);
		query.find({
	  		success: function(admins) {
	  			for( var i=0; i<admins.length; i++){
	  				if( admins[i].id === Parse.User.current().id ){
	  				this.setState({isAdmin:true});
	  				}
	  			}
  			}.bind(this)
		});

		var data = [];
		var allUsers = new Parse.Query(Parse.User);

		allUsers.notEqualTo("isAdmin", true);

		allUsers.find({
			success:function(items){
			//alert(items.length);
			for(var i=0;i<items.length;i++){
				var userData = {};
				userData.uid = items[i].id;
				console.log(userData.uid);
				userData.username = items[i].get('username');
				data.push(userData);
			}

			this.setState({data:data});
			}.bind(this)
			});

	},
	renderCreateUserBox: function() {
		this.setState({creatingUser:true});
	},
	creatingUser: function(){
		this.setState({creatingUser:false});
	},
	logout: function(){
		Parse.User.logOut().then( function(results){
		console.log(results);
		this.props.filter({loggedIn: false});
		}.bind(this));
	},
	render: function(){	
		//we need to get the user object ids and use them as keys in the hotel users for reference key={}, make sure to hook up to the hotel user data model
		var hotelUserNodes = this.state.data.map(function (user) {
			//alert(user.uid);
      return (
        <HotelUser username={user.username} key={user.uid} objId={user.uid} />
      );
    });
		var isAdmin = this.state.isAdmin ? 
			<div>
				<p>Welcome SwingShift Admin</p>
				<button disabled={this.state.creatingUser} onClick={this.renderCreateUserBox} >Create User</button>
				<h2> list of users </h2>
				{hotelUserNodes}
			</div> : 
			<div>
				<p>Welcome SwingShift Hotel Member</p>
				<button>Profile</button>
				<button>View Dashboard</button>
			</div>;
		var isCreatingUser = this.state.creatingUser ? <CreateUserBox isActive={this.creatingUser} data={this.state.data} /> : '';
		return(
			<div>
			<h2>Swing Shift Hotels <button onClick={this.logout} >Logout</button></h2>
			{isCreatingUser}
			{isAdmin}			
			</div>
		);
	}
});
var App = React.createClass({
	getInitialState: function(){
		//DEBUG set loggedIn to false for production
		return {
			loggedIn:true
		};
	},
	userAuth: function(auth){
		this.setState(auth);
	},
	render: function(){
		var isLoggedIn = this.state.loggedIn ? <Dashboard filter={this.userAuth} /> : <LoginForm filter={this.userAuth} />;
		return (
			<div>
			<h1>SwingShift</h1>
				{isLoggedIn}
			</div>
		);
	}
});

React.render(
  <App />,
  document.getElementById('content')
);