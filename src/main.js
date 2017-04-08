import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './state/store.js';
import routes from './router/routes.js';

const router = new VueRouter( { routes } );

Vue.use( VueRouter );

new Vue( {
	el: '#app',
	store,
	router,
	render: h => h( App )
} );
