var api = {
	wasClicked: false,
	click: function ( delay ) {
		if ( ! api.wasClicked ) {
			api.wasClicked = true;
			window.postMessage( { type: 'click', message: delay }, location.origin );
		} else {
			api.clickDeclined();
		}
	},

	loaded: function () { },
	destroyCountDown: function ( remainingTime ) { },
	beforeDestroy: function () { },
	clickDeclined: function () { }
};

window.addEventListener( 'message', function ( event ) {
	if ( event && event.data ) {
		var type = event.data.type;
		var message = event.data.message;

		if ( type === 'load' ) {
			if ( typeof api.loaded === 'function' ) {
				api.loaded();
			}
		}

		if ( type === 'destroy' ) {
			if ( typeof api.destroy === 'function' ) {
				api.destroy();
			}
		}

		if ( type === 'beforeDestroy' ) {
			if ( typeof api.beforeDestroy === 'function' ) {
				api.beforeDestroy( message );
			}
		}
	}
} );