<template>
<div class="fila">
    
    <v-row>
        <v-col >
            <v-text-field
                label="Tarea"
                filled
                dense
                v-model="taskLocal"
            ></v-text-field>
        </v-col>
        <v-col col-2>
            <v-btn      
              color="blue-grey"
              class="ma-2 white--text"
              @click="addToTask"
            >
              <v-icon
                dark
                fab
              >
                mdi-plus
              </v-icon>
            </v-btn>
        </v-col>
    </v-row>

</div>
</template>

<script>


export default {
    name: 'InputAndButton',
    props: {
        task: String
    },
    data() {
        return {
            taskLocal: '',
        }
    },
    methods: {
        addToTask(){
            this.$emit('addTask', {
                title: this.taskLocal,
                state: 0
            })
            this.taskLocal = ''
        },
    },

    created () {
        this.taskLocal = this.task

        /* this.$root.$on("resetFormTask", () => {
            this.task = ''
	    }) */
    },
}
</script>

<style lang="scss" scoped>

</style>