<template>
    <v-col col="6" md="6" sm="12">
        <v-list subheader two-line>
            <v-subheader inset>Productos</v-subheader>
            <v-list-item v-for="product in products" :key="product.id">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="product.name"></v-list-item-title>

                    <v-list-item-subtitle v-text="product.sell_price"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon @click="add(product)">
                        <v-icon color="grey lighten-1">mdi-plus</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>
        </v-list>
    </v-col>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array
        }
    },
    methods: {
        add(product) {
            this.$root.$emit('addingProduct', product)
        }
    },
}
</script>

<style lang="scss" scoped></style>