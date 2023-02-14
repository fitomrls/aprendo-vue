<template>
    <div>
        <h1>Tareas</h1>
        <ul>
            <li v-for="tarea in tasks" :key="tarea.id">
                {{ tarea.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

    
    export default {
        name:"Suma",

        methods: {
            ...mapActions(['retrieveTasks'])
        },

        computed: {
            ...mapGetters(['tasks'])
        },

        created () {
            if(this.tasks.length==0){
                this.retrieveTasks()
            }
        },
    }
</script>

<style>

</style>