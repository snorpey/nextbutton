<template>
	<div class="container">
		<!-- <buttonframe :src="iframeSrc"></buttonframe> -->
		<router-view/>
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
	}
}
</script>

<style>

</style>
