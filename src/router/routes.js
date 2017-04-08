import buttonframe from '../components/buttonframe.vue';

export default [
	{ path: '/', component: buttonframe },
	{ path: '/button/:buttonId', name: 'button', component: buttonframe }
];