<template>
	<div class="button-frame">
		<iframe :src="src" class="iframe"></iframe>
	</div>
</template>

<style>
.iframe { border: none; width: 100%; height: 100%; display: block; }
.button-frame { width: 100%; height: 100%; }
</style>

<script>

export default {
	name: 'buttonframe',
	data: function () {
		return {
			iframeEl: null
		}
	},
	mounted: function () {
		this.updateItemIndex();
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
	computed: {
		src: function () {
			const item = this.$store.state.items[this.itemIndex];
			return item ? item.url : '';
		},
		itemIndex: function () {
			const index = this.itemIndexById( this.$route.params.buttonId );
			return index > -1 ? index : 0;
		},
		nextItem: function () {
			const nextItemIndex = this.itemIndex + 1 >= this.$store.state.items.length ? 0 : this.itemIndex + 1;
			return this.$store.state.items[nextItemIndex];
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
					this.next();
				}
			}
		},
		itemIndexById: function ( id ) {
			return this.$store.state.items.reduce( function ( result, item, index ) {
				if ( item.id === id ) { result = index; }
				return result;
			}, -1 );
		},
		nextItemIndex: function () {
			return this.itemIndex + 1;
		},
		updateItemIndex: function () {
			this.$store.dispatch( 'index', this.itemIndex );
		},
		next: function () {
			this.iframeEl.contentWindow.postMessage( { type: 'nextRequested' }, location.origin );

			setTimeout( function () {
				this.iframeEl.contentWindow.postMessage( { type: 'beforeDestroy' }, location.origin );
			}.bind( this ), 1000 );
			
			setTimeout( function () {
				this.$router.push( { name: 'button', params: { buttonId: this.nextItem.id } } );
			}.bind( this ), 1500 );
		}
	},
	watch: {
		itemIndex: function () {
			this.updateItemIndex();
		}
	}
}
</script>