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
			<div className="page-header">
			<h2 className="pad-left">SwingShift Hotels Dashboard</h2>
			</div>
			{isLoggedIn}
			</div>
			
		);
	}
});

React.render(
  <App />,
  document.getElementById('content')
);