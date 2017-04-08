<template>
	<div class="container">
		<router-view/>
		<logo />
		<info />
	</div>
</template>

<script>
import { loadJSON } from './util/load.js';
import buttonframe from './components/buttonframe.vue';
import info from './components/info.vue';
import logo from './components/logo.vue';

export default {
	name: 'nextbutton',
	components: { buttonframe, info, logo },
	mounted: function () {
		this.$store.dispatch( 'load' );
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: sans-serif;
}

.container {
	width: 100%;
	height: 100vh;
	border: 15px #fff solid;
}
</style>
