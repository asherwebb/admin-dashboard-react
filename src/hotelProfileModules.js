//FIXME: the best case here would be to have a class for each of the following textarea, select, text input, file input, checkbox
//then we can route the edit buttons and bi-directional data flow

var AboutHotel = React.createClass({
	getInitialState: function(){
		return{
			underEditing: false,
			buttonText: 'edit',
		}
	},
	toggleEditTrigger: function(e){
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function(){
		var on = {underEditing: true, buttonText: 'cancel'}, off = {underEditing: false, buttonText: 'edit'};


		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	updateModule: function(e){ 
		e.preventDefault();
		var update = this.refs.about_hotel.getDOMNode().value;
		this.toggleEdit();
		var key = this.props.objKey;
		this.props.onUpdate(key, update);
	},
	render: function(){
		var moduleState = this.state.underEditing ? <div><textarea ref="about_hotel" defaultValue={this.props.data}></textarea><br /><button className="btn btn-success" onClick={this.updateModule}>Save</button></div> 
		: 
		<p>{this.props.data}</p>;

		return(
			<div>
			<h4>About Hotel</h4>
			{moduleState}
			<button onClick={this.toggleEditTrigger} > {this.state.buttonText} </button>
			</div>
			);
		}
});