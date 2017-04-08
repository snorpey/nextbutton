<template>
	<div class="info" v-if="item">
		<span class="info-part">{{ item.name }}</span> 
		<span v-if="item.meta.author.url" class="info-part"><a :href="item.meta.author.url">{{ item.meta.author.name }}</a></span>
		<span v-else class="info-part">{{ item.meta.author.name }}</span>
		<span class="info-part">{{ item.meta.date }}</span>
	</div>
</template>

<style>
.info {
	position: absolute;
	top: 40px;
	right: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	color: #fff;
}

.info-part {
	padding: 0 5px;
}

.info-part a {
	color: #fff;
	text-decoration: none;
}

.info-part + .info-part::before {
	content: '//';
	padding-right: 10px;
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