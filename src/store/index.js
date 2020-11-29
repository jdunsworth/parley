/**
 * ============================================================
 * Parley Vuex Store
 * ============================================================
 */

// Imports
import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config.js';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: config.defaultState,
    getters,
    actions,
    mutations,
  });

  return Store;
}
