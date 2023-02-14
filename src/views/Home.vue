<template>
  <v-container>    
      <v-card
        max-width="100%"
        class="mx-auto"
      >
        <v-toolbar
          color="light-blue"
          dark
        >
          <v-toolbar-title>Tod List</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <InputAndButton 
            :task="task"
            @addTask="agregarTarea"
          />
        </v-card-text>

        <v-list
          subheader
          two-line
        >

          <Fila 
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @changeState="cambiar"
          />

        </v-list>
      </v-card>

      <!-- <InputAndButton 
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
      </ul> -->
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import InputAndButton from '../components/InputAndButton.vue'
import Fila from '../components/Fila.vue'


export default {
  name: 'Home',
  components: {
      InputAndButton,
      Fila
  },

  data() {
    return {
        estado: '',
        task: '',
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
          
          this.updateTask(task).then(resp=>{
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