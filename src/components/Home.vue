<template>
    <section class="centro">
        <h2>To do list:</h2>
        <InputAndButton @addTask="agregarTarea" />
        <ul>
            <li v-for="tarea, index in tasks" :key="tarea.id">
                <div class="row">
                    <div>{{ tarea.title }}</div>
                    <div>
                        <input v-if="tarea.state == 0" type="checkbox" @click="cambiar(tarea)">
                        <input v-else type="checkbox" checked @click="cambiar(tarea)">
                        <button @click="borrar(tarea.id)">-</button>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from 'axios'
import InputAndButton from './InputAndButton.vue'
export default {
    name: 'Home',
    components: {
        InputAndButton
    },
    data() {
        return {
            tasks: []
        }
    },
    //crear proyecto vue', 'instalar depencias', 'ejecutar proyecto'
    methods: {
        agregarTarea(fdata) {
            axios.post('http://localhost/api-blog/public/api/tasks', fdata)
                .then(resp => {
                    this.tasks.push({
                        id: resp.data,
                        title: fdata.title,
                        state: 0
                    })
                    //this.task = ''
                })
        },
        borrar(id) {
            axios.delete('http://localhost/api-blog/public/api/tasks/' + id)
                .then(resp => {
                    const index = this.tasks.findIndex(elem => elem.id == id)
                    this.tasks.splice(index, 1)
                })
        },
        cambiar(task) {
            let estado = 0
            if (task.state == 0) {
                estado = 1
            }
            axios.put('http://localhost/api-blog/public/api/tasks/' + task.id,
                {
                    state: estado
                }).then(resp => {
                    this.tasks.map(elem => {
                        if (elem.id == task.id) {
                            if (elem.state == 1) { elem.state = 0 }
                            else { elem.state = 1 }
                        }
                    })
                })

        }
    },
    created() {
        axios.get('http://localhost/api-blog/public/api/tasks').then(resp => {
            this.tasks = resp.data
        })
    },
}
</script>

<style>

</style>