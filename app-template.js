var CreateUserForm = React.createClass({
	getInitialState: function(){
 		return null
	},
	componentWillMount: function(){

	},
	render: function(){
		return(
			<div>
				<form>
					<input type="text" />
					<input type="text" />
					<button> Submit </button>
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
	},
	renderCreateUserForm: function() {
		this.setState({creatingUser:true});
	},
	logout: function(){
		Parse.User.logOut().then( function(results){
		console.log(results);
		this.props.filter({loggedIn: false});
		}.bind(this));
	},
	render: function(){	
		var isAdmin = this.state.isAdmin ? <div><p>Welcome SwingShift Admin</p><button onClick={this.renderCreateUserForm} >Create User</button><p>List of Users will go here with editing button</p></div> : <div><p>Welcome SwingShift Hotel Member</p><button>Profile</button><button>View Dashboard</button></div>;
		var isCreatingUser = this.state.creatingUser ? <CreateUserForm /> : '';
		return(
			<div>
			<h2>Swing Shift Hotels <button onClick={this.logout} >Logout</button></h2>
			{isAdmin}
			{isCreatingUser}
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
