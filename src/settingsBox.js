

var HubCitiesList = React.createClass({
	removeCityFromList: function(i){
		this.props.removeCity(i);
		console.log( "you clicked" + i );
		//get element at i from array, remove and reset state
	},
	render: function() {

		return(
		      <div>
        {this.props.data.map(function(hotel, i) {
          return (
            <div key={i} >{hotel} <button onClick={this.removeCityFromList.bind(this, i)}>Delete</button></div>
          );
        }, this)}
      </div>
			);
	}

});

var AppPolicies = React.createClass({
	render: function() {
		return(
			<p>{this.props.data}</p>
			);
	}
});

var SettingsBox = React.createClass({
	getInitialState: function() {
		return{
			hubCities:[],
			appPolicies:''
		}
	},
	updateDbHubCities: function(hubCities){
		var hubCities = hubCities;
		console.log(hubCities);
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);
		settingsInfoQuery.first({
			success: function(settings){
				settings.save( {hub_cities:hubCities}, {
					success: function(results){
						console.log('hub cities updated');
					},
					error: function(results, error){
						alert("Error: Hub city update was not able to be processed");
					}
				});
			},
			error: function(settings, error){
				alert("Error: Settings cannot be accessed");
			}

		});
	},
	removeCity: function(cityIndex){
		console.log(cityIndex);
		var hubCities = this.state.hubCities;
		console.log(hubCities)
		hubCities[cityIndex] = null;
		hubCities = _.compact(hubCities);


		this.updateDbHubCities(hubCities);
		this.setState({hubCities:hubCities});
	},
	addCity: function(e){
		e.preventDefault();
		var hubCity = this.refs.addHubCity.getDOMNode().value;
		console.log(hubCity);
		var hubCities = this.state.hubCities;
		console.log(hubCities);
		hubCities.unshift(hubCity);
		console.log(hubCities);
		this.updateDbHubCities(hubCities);
		this.setState({hubCities:hubCities});
		//this.state.hubCities
		//array.unshift(new city)
		//call set state with new arr
		this.refs.addHubCity.getDOMNode().value = '';
	},
	componentWillMount: function() {
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: function(obj) {
				var hubCitiesArray = obj.get('hub_cities');
				console.log(hubCitiesArray);
				var appPolicies = obj.get("app_policies");

				this.setState( {hubCities:hubCitiesArray, appPolicies: appPolicies} );
			}.bind(this),
			error: function(obj, error) {
				alert('Error retreiving hub cities');
			}.bind(this)
		});

	},
	render: function(){		
		
		return(
			<div className="container-fluid">
				<h3>Settings Views</h3>
				<button>Close</button>
				<label>Hub Cities</label><br />
				<span>These hub cities will appear on the home screen of the Swing Shift Mobile application along with a near me 
				option to ensure users will be funneled toward cities that initially have hotels offerring rooms in the app.</span>
				
				<HubCitiesList data={this.state.hubCities} removeCity={this.removeCity} />
				<div className="form-inline">
				<input type="text" className="form-control" placeholder="City, St" ref="addHubCity"/><button className="btn" onClick={this.addCity} >Add Hub City</button>
				</div>
				
				<br />

				<label>General App Booking Policies</label>
				<span>This information appears during the booking process and informs the users of Swing Shift booking policies.</span>
				<br />
				<AppPolicies data={this.state.appPolicies} />
				<button>edit general policies</button>

				<br />

			</div>
		);
	}
});