<template>
<div class="fila">
    <input type="text" v-model="taskLocal">
    <button @click="addToTask">(+)</button>
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
                title: this.taskLocal
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