import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: " SET_ADDRESS",
  ORDER_INFO: "ORDER_INFO"
}

const state = {
  location: {},
  address: "",
  orderinfo: null

}

const getters = {
  location: state => state.location,
  address: state => state.address,
  orderinfo: state => state.orderinfo
}

const mutations = {
  [types.SET_LOCATION](state, location) {
    if (location) {
      state.location = location;
    } else {
      state.location = null;
    }
  },
  [types.SET_ADDRESS](state, address) {
    if (address) {
      state.address = address;
    } else {
      state.address = '';
    }
  },
  [types.ORDER_INFO](state, orderinfo) {
    if (orderinfo) {
      state.orderinfo = orderinfo;
    } else {
      state.orderinfo = null;
    }
  }
}

const actions = {
  setlocation: ({ commit }, location) => {
    commit(types.SET_LOCATION, location)
  },
  setaddress: ({ commit }, address) => {
    commit(types.SET_ADDRESS, address)
  },
  setloorderinfo: ({ commit }, orderinfo) => {
    commit(types.ORDER_INFO, orderinfo)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
