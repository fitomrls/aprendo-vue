import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = " http://127.0.0.1:8000/api"

export default new Vuex.Store({
  state: {
    tasks: null, 
    products: true
  },

  getters: {
    tasks: state => state.tasks,
    products: state => state.products
  },
  
  mutations: {
    SET_TASKS(state, payload) {
      state.tasks = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },

    ADD_TASK(state, payload) {
      state.tasks.push(payload)
    },
    UPDATE_TASK(state, payload) {

      state.tasks.map(task => {
        if (task.id == payload.id) {
          task.state = payload.state
        }
      })

    }
  },
  actions: {

    async retrieveTasks(context) {

      await axios.get('tasks').
      then(response => {
        context.commit('SET_TASKS', response.data)
      })

    },

    async retrieveProducts(context) {
      await axios.get('products').
      then(response => {
        context.commit('SET_PRODUCTS', response.data.data)
      })

    },

    async createTask(context, fdata) {
      
      await axios.post('tasks', fdata).then(res => {
        fdata.id = res.data
        context.commit('ADD_TASK', fdata)
      })

    },

    updateTask(context, fdata) {

      return new Promise( (resolve, reject)=>{
        
        axios.put('tasks/' + fdata.id, fdata)
        .then(res => {
          context.commit('UPDATE_TASK', fdata)
          resolve('ok')
        }).catch(error=> reject(error) )
      
      })

    }

  },
  modules: {
  }
})
