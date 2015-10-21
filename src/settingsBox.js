var HubCitiesList = React.createClass({
	removeCityFromList: function(i){
		this.props.removeCity(i);
	},
	render: function() {
		return(
		    <div>
		    	<h4>Hub Cities</h4>
				<p>These hub cities will appear on the home screen of the Swing Shift Mobile application along with a near me 
				option to ensure users will be funneled toward cities that initially have hotels offerring rooms in the app.</p>

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
	getInitialState: function(){
		return{
			underEditing: false,
			buttonText: 'edit',
		}
	},
	updatePolicies: function(e){
		e.preventDefault();
		var policy = this.refs.appPolicy.getDOMNode().value;
		this.props.onUpdate(policy);
		this.editingToggle();
	},
	editPolicy: function(e){
		e.preventDefault();
		this.editingToggle();
	},
	editingToggle: function(){
		var on = {underEditing: true, buttonText: 'cancel'}, off = {underEditing: false, buttonText: 'edit'}
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	render: function() {
		var appPoliciesState = this.state.underEditing ? 
			<div><textarea ref="appPolicy" className="form-control" defaultValue={this.props.data}></textarea>
			<button onClick={this.updatePolicies} className="btn btn-success" >Save</button>
			</div>
			: 
			<p>{this.props.data}</p>;
		return(
			<div>
				<h4>General App Booking Policies</h4>
				<p>This information appears during the booking process and informs the users of Swing Shift booking policies.</p>
				
				{appPoliciesState}
				
				<button onClick={this.editPolicy}>{this.state.buttonText}</button>
			</div>
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
	updateSettingsParse: function( data ){
		var data = data;
		var payload = data.data;
		var label = data.label;

		var SettingsInfo = Parse.Object.extend( "Settings_Info" );
		var settingsInfoQuery = new Parse.Query( SettingsInfo );

		settingsInfoQuery.first({
			success: function( settings ){
				settings.save( payload , {
					success: function( results ){
						console.log( label + 'updated' );
					},
					error: function( results, error ){
						alert( "Error: " + label + " update was not able to be processed" );
					}
				});
			},
			error: function(settings, error){
				alert("Error: Settings cannot be accessed");
			}
		});
	},
	removeCity: function( cityIndex ){
		var hubCities = this.state.hubCities;
		hubCities[cityIndex] = null;
		hubCities = _.compact( hubCities );
		var data = { data: { hub_cities: hubCities }, label: "Hub Cities" };
		this.updateSettingsParse( data );
		this.setState( { hubCities: hubCities } );
	},
	addCity: function( e ){
		e.preventDefault();
		var hubCity = this.refs.addHubCity.getDOMNode().value;
		var hubCities = this.state.hubCities;
		hubCities.unshift( hubCity );

		var data = { data: { hub_cities: hubCities }, label: "Hub Cities" };

		this.updateSettingsParse( data );
		this.setState( { hubCities: hubCities } );
		this.refs.addHubCity.getDOMNode().value = '';
	},
	componentWillMount: function() {
		var SettingsInfo = Parse.Object.extend("Settings_Info");
		var settingsInfoQuery = new Parse.Query(SettingsInfo);

		settingsInfoQuery.first({
			success: function(obj) {
				var hubCitiesArray = obj.get('hub_cities');
				var appPolicies = obj.get("app_policies");

				this.setState( {hubCities:hubCitiesArray, appPolicies: appPolicies} );
			}.bind(this),
			error: function(obj, error) {
				alert( 'Error retreiving hub cities' );
			}.bind(this)
		});

	},
	updateAppPolicies: function(policy) {
		var policy = policy;
		this.setState( { appPolicies: policy } );
		var data = { data: { app_policies: policy }, label: "App Policies" };
		this.updateSettingsParse( data );
	},
	closeSettings: function(e){
		e.preventDefault();
		this.props.hideBox();
	},
	render: function(){		
		return(
			<div className="container-fluid">
				<h3>Settings Views</h3> <button className="btn" onClick={this.closeSettings} >Close</button>
				
				<HubCitiesList data={this.state.hubCities} removeCity={this.removeCity} />

				<div className="form-inline">
				<input type="text" className="form-control" placeholder="City, St" ref="addHubCity"/>
				<button className="btn" onClick={this.addCity} >Add Hub City</button>
				</div>

				<AppPolicies data={this.state.appPolicies} onUpdate={this.updateAppPolicies} />
				
				<br />

			</div>
		);
	}
});