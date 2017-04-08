<template>
	<div class="info" v-if="item">
		<span>{{ item.name }}</span> 
		<a v-if="item.meta.author.url" :href="item.meta.author.url">{{ item.meta.author.name }}</a>
		<span v-else>{{ item.meta.author.name }}</span>
	</div>
</template>

<style>
.info {
	position: absolute;
	bottom: 10px;
	left: 10px;
}
</style>

<script>
export default {
	name: 'info',
	computed: {
		item: function () {
			return this.$store.state.items[this.$store.state.currentItemIndex];
		}
	}
}
</script>