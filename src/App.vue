<template>
	<div class="container">
		<buttonframe :src="iframeSrc"></buttonframe>
		<info />
	</div>
</template>

<script>
import { loadJSON } from './util/load.js';
import buttonframe from './components/buttonframe.vue';
import info from './components/info.vue';

export default {
	name: 'nextbutton',
	components: { buttonframe, info },
	mounted: function () {
		this.$store.dispatch( 'load' );
	},
	computed: {
		iframeSrc: function () {
			const index = this.$store.state.currentItemIndex;
			const item = this.$store.state.items[index];

			return item ? item.url : '';
		}
	}
}
</script>

<style>

</style>
