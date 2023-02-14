<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title v-text="task.title"></v-list-item-title>

            <v-list-item-subtitle>
                <v-chip x-small v-if="task.state == 1" class="ma-2" color="green" text-color="white">
                    Done
                </v-chip>
                <v-chip v-else x-small class="ma-2" color="red" text-color="white">
                    Pendiente
                </v-chip>

            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-switch 
                v-model="estado"
                @change="cambio"
            >
            </v-switch>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'Fila',
    props: {
        task: Object
    },

    data() {
        return {
            estado: false
        }
    },

    methods: {
        cambio() {

            this.$emit('changeState', {
                id: this.task.id,
                state: this.estado? 1 : 0
            })
        }
    },

    created () {
        /* if(this.task.state==0){
            this.estado = false
        }else{
            this.estado = true
        } */

        this.task.state==0? this.estado=false : this.estado=true
    },
}
</script>

<style lang="scss" scoped>

</style>