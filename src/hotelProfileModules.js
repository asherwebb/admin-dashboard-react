var AboutHotel = React.createClass({
	getInitialState: function(){
		return{
			underEditing: false,
			buttonText: 'edit',
		}
	},
	componentDidMount: function(){

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

var HotelImage = React.createClass({
		getInitialState: function(){
		return{
			underEditing: false,
			buttonText: 'edit',
		}
	},
	updateModule: function(e) {
		//depending on the key assign image to correct dom node
		var key = this.props.objKey;
		var image;

		switch( key ) {
			case "featured_image":
				image = this.refs.featured_image.getDOMNode().files[0];
				break;
			case "hotel_image_1":
				image = this.refs.hotel_image_1.getDOMNode().files[0];
				break;
			case "hotel_image_2":
				image = this.refs.hotel_image_2.getDOMNode().files[0];
				break;
			case "hotel_image_3":
				image = this.refs.hotel_image_3.getDOMNode().files[0];
				break;
			case "hotel_image_4":
				image = this.refs.hotel_image_4.getDOMNode().files[0];
				break;
			case "hotel_image_5":
				image = this.refs.hotel_image_5.getDOMNode().files[0];
				break;
			case "hotel_image_6":
				image = this.refs.hotel_image_6.getDOMNode().files[0];
				break;
			case "hotel_image_7":
				image = this.refs.hotel_image_7.getDOMNode().files[0];
				break;
			case "hotel_image_8":
				image = this.refs.hotel_image_8.getDOMNode().files[0];
				break;
			case "hotel_image_9":
				image = this.refs.hotel_image_9.getDOMNode().files[0];
				break;
			case "hotel_image_10":
				image = this.refs.hotel_image_10.getDOMNode().files[0];
				break;
			case "hotel_image_11":
				image = this.refs.hotel_image_11.getDOMNode().files[0];
				break;
			case "hotel_image_12":
				image = this.refs.hotel_image_12.getDOMNode().files[0];
				break;			
		}

		var update = new Parse.File( key + '.jpg', image);
		update.save().then( function(obj) {
			this.props.onUpdate( key, obj );
			this.toggleEdit();
		}.bind(this) );
		//create a new parse file of the image
		//update the ui
		//send to parse
	},
	toggleEditTrigger: function(e){
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function(){
		var on = {underEditing: true, buttonText: 'cancel'}, off = {underEditing: false, buttonText: 'edit'};
		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	render: function(){
		var moduleState = this.state.underEditing ? 
			<div>
				<input ref={this.props.objKey} type="file" /><br />
				<button className="btn btn-success" onClick={this.updateModule}>Save</button>
				<p className="warning"> Make sure your images are saved at 640 pixels width and 520 pixels height at 72 pixels per inch in .jpg format</p>
			</div>
			:
			<img src={this.props.data} width="/>
		return(
			<div>
			{moduleState}
			<button onClick={this.toggleEditTrigger} > {this.state.buttonText} </button>
			</div>
			);
	}
	});