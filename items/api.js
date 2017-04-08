var api = {
	wasClicked: false,
	click: function () {
		if ( ! api.wasClicked ) {
			api.wasClicked = true;
			window.postMessage( { type: 'click' }, location.origin );
		} else {
			api.clickDeclined();
		}
	},

	loaded: function () { },
	nextRequested: function () { },
	beforeDestroy: function () { },
	clickDeclined: function () { }
};

window.addEventListener( 'message', function ( event ) {
	if ( event && event.data ) {
		var type = event.data.type;

		if ( type === 'load' ) {
			if ( typeof api.loaded === 'function' ) {
				api.loaded();
			}
		}

		if ( type === 'nextRequested' ) {
			if ( typeof api.nextRequested === 'function' ) {
				api.nextRequested();
			}
		}

		if ( type === 'destroy' ) {
			if ( typeof api.destroy === 'function' ) {
				api.destroy();
			}
		}

		if ( type === 'beforeDestroy' ) {
			if ( typeof api.beforeDestroy === 'function' ) {
				api.beforeDestroy();
			}
		}
	}
} );