<template>
	<div class="logo">
		<h1>
			<span class="logo-next">next</span><span class="logo-button">button</span>
		</h1>
	</div>
</template>

<style>
.logo {
	position: absolute;
	top: 40px;
	left: 40px;
	z-index: 2;
	color: #fff;
}

.logo span {
	padding: 4px;
}

.logo-next {
	padding-right: 0;
}

.logo-button {
	background-color: #fff;
	color: #000;
}
</style>

<script>
export default {
	name: 'logo'
};
</script>