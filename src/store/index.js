import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = " http://localhost:8000/api"

export default new Vuex.Store({
  state: {
    tasks: null,
    products: [],
  },

  getters: {
    tasks: (state) => state.tasks,
    products: (state) => state.products,
  },

  mutations: {
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },

    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    UPDATE_TASK(state, payload) {
      state.tasks.map((task) => {
        if (task.id == payload.id) {
          task.state = payload.state;
        }
      });
    },
    UPDATE_PRODUCT(state, payload) {
      state.products.map(element =>{
        if (element.id == payload.id){
          element.cuantos += 1;
        }
      });
    }
  },
  actions: {
    async retrieveTasks(context) {
      await axios.get("tasks").then((response) => {
        context.commit("SET_TASKS", response.data);
      });
    },

    async retrieveProducts(context) {
      await axios.get("products").then((response) => {
        context.commit("SET_PRODUCTS", response.data.data);
      });
    },

    async createTask(context, fdata) {
      await axios.post("tasks", fdata).then((res) => {
        fdata.id = res.data;
        context.commit("ADD_TASK", fdata);
      });
    },

    updateTask(context, fdata) {
      return new Promise((resolve, reject) => {
        axios
          .put("tasks/" + fdata.id, fdata)
          .then((res) => {
            context.commit("UPDATE_TASK", fdata);
            resolve("ok");
          })
          .catch((error) => reject(error));
      });
    },

    addProduct(context, fdata) {
      console.log(fdata);
      context.commit("UPDATE_PRODUCT", fdata);
    },
  },
  modules: {},
});
