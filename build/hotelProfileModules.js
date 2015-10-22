//FIXME: the best case here would be to have a class for each of the following textarea, select, text input, file input, checkbox
//then we can route the edit buttons and bi-directional data flow

'use strict';

var AboutHotel = React.createClass({
	displayName: 'AboutHotel',

	getInitialState: function getInitialState() {
		return {
			underEditing: false,
			buttonText: 'edit'
		};
	},
	toggleEditTrigger: function toggleEditTrigger(e) {
		e.preventDefault();
		this.toggleEdit();
	},
	toggleEdit: function toggleEdit() {
		var on = { underEditing: true, buttonText: 'cancel' },
		    off = { underEditing: false, buttonText: 'edit' };

		this.state.underEditing ? this.setState(off) : this.setState(on);
	},
	updateModule: function updateModule(e) {
		e.preventDefault();
		var update = this.refs.about_hotel.getDOMNode().value;
		this.toggleEdit();
		var key = this.props.objKey;
		this.props.onUpdate(key, update);
	},
	render: function render() {
		var moduleState = this.state.underEditing ? React.createElement(
			'div',
			null,
			React.createElement('textarea', { ref: 'about_hotel', defaultValue: this.props.data }),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ className: 'btn btn-success', onClick: this.updateModule },
				'Save'
			)
		) : React.createElement(
			'p',
			null,
			this.props.data
		);

		return React.createElement(
			'div',
			null,
			React.createElement(
				'h4',
				null,
				'About Hotel'
			),
			moduleState,
			React.createElement(
				'button',
				{ onClick: this.toggleEditTrigger },
				' ',
				this.state.buttonText,
				' '
			)
		);
	}
});