import Vue from 'vue';
import Vuex from 'vuex';
import { loadJSON } from '../util/load.js';
import { stringToSlug } from '../util/string.js';

Vue.use( Vuex )

const state = {
	items: [ ],
	currentItemIndex: 0
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	add ( state, item ) {
		item.id = stringToSlug( item.name || 'item-' + state.items.length );
		state.items.push( item );
	},
	index ( state, index ) {
		state.currentItemIndex = index;
	}
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
	load: function ( { commit } ) {
		loadJSON( 'data/items.json' )
			.then( data => {
				data.items.forEach( item => { commit( 'add', item ) } );
			} );
	},
	next: function ( { commit }, delay = 1000 ) {
		setTimeout( () => {
			commit( 'next' );
		}, delay )
	},
	index: function ( { commit }, newIndex ) {
		commit( 'index', newIndex );
	}
};

// getters are functions
const getters = {
	
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store( {
	state,
	getters,
	actions,
	mutations
} );
