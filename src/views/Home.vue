<template>
  <section class="centro">
      <h2>To do list: <span v-show="estado!=''">{{ estado }}</span></h2>
      <InputAndButton 
        @addTask="agregarTarea" 
        :task="task"
      />
      <ul>
          <li v-for="tarea, index in tasks" :key="tarea.id">
              <div class="row">
                  <div>{{ tarea.title }}</div>
                  <div>
                      <input 
                        v-if="tarea.state == 0" 
                        type="checkbox" 
                        @click="cambiar(tarea)">
                      <input 
                        v-else 
                        type="checkbox" 
                        checked 
                        @click="cambiar(tarea)">
                      <button @click="borrar(tarea.id)">-</button>
                  </div>
              </div>
          </li>
      </ul>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import InputAndButton from '../components/InputAndButton.vue'


export default {
  name: 'Home',
  components: {
      InputAndButton
  },

  data() {
    return {
        estado: '',
        task: ''
    }
  },
  
  methods: {
      ...mapActions([
            'retrieveTasks',
            'createTask',
            'updateTask'
        ]),
      async agregarTarea(fdata) {
        this.estado = 'creando...'
        await this.createTask(fdata)
        this.estado = 'terminado'
        //this.$root.$emit('resetFormTask')
        this.task = ''
      },
      borrar(id) {
          /* axios.delete('http://localhost/api-blog/public/api/tasks/' + id)
              .then(resp => {
                  const index = this.tasks.findIndex(elem => elem.id == id)
                  this.tasks.splice(index, 1)
              }) */
      },
      cambiar(task) {
          this.estado = 'cargando...'
          let estado = 0
          if (task.state == 0) {
              estado = 1
          }

          this.updateTask({
            id: task.id,
            state: estado
          }).then(resp=>{
              this.estado = 'hecho'
          })

      },

      fetchTareas(){
        this.retrieveTasks()
      }
  },
  computed: {
    ...mapGetters(['tasks'])
  },

  /* watch: {
    tasks(newValue, oldValue) {
        this.estado = ''
        this.$root.$emit('resetFormTask')
    }
  }, */

   async created() {
    this.estado = 'cargando...'
    await this.retrieveTasks()
    this.estado = 'done'
  },
}
</script>

<style>
    ul{
        list-style: none;
    }
    .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2 span{
        font-size: 12px;
    }
</style>