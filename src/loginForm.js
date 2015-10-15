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
				<form onSubmit={this.processLogin} >
     				<div className="center-400w">
     					<h5 className="left-margin-100" >Login</h5>	
        				<input type="text" placeholder="Enter your username" id="username" ref="username" className="form-control input-margin" required/>
        				<input type="password" placeholder="Enter your password" id="pass" ref="pass" className="form-control input-margin" required/>
        				<input type="submit" id="login" value="Login" className="btn btn-primary" onClick={this.increment} />
        			</div>
      			</form>				
			</div>
		);
	}
});