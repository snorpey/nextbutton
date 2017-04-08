<template>
	<div class="button-frame">
		<iframe :src="src" class="iframe"></iframe>
	</div>
</template>

<style>
.iframe { border: none; }
</style>

<script>

export default {
	name: 'buttonframe',
	props: [ 'src' ],
	data: function () {
		return {
			iframeEl: null
		}
	},
	mounted: function () {
		this.iframeEl = this.$el.querySelector( '.iframe' );
		this.iframeEl.addEventListener( 'load', this.frameLoaded.bind( this ) );
	},
	beforeDestroy: function () {
		if ( this.iframeEl ) {
			this.iframeEl.removeEventListener( 'load', this.frameLoaded.bind( this ) );

			if ( this.iframeEl.contentWindow ) {
				this.iframeEl.contentWindow.removeEventListener( 'message', this.messageReceived.bind( this ) );
			}
		}
	},
	methods: {
		frameLoaded: function () {
			if ( this.src.length ) {
				this.iframeEl.contentWindow.addEventListener( 'message', this.messageReceived.bind( this ) );
				this.iframeEl.contentWindow.postMessage( { type: 'load' }, location.origin );
			}
		},
		messageReceived: function ( event ) {
			if ( event && event.data && event.data.type ) {
				const type = event.data.type;
								
				if ( type === 'click' ) {
					this.$store.dispatch( 'next', 1500 );

					setTimeout( function () {
						this.iframeEl.contentWindow.postMessage( { type: 'beforeDestroy' }, location.origin );
					}.bind( this ), 1000 );
				}
			}
		}
	}
}
</script>