<template>
    <v-col col="6" md="6" sm="12">
        <v-list subheader two-line dark>
            <v-subheader inset>Carrito</v-subheader>

            <v-list-item v-for="product in carts" :key="product.id">
                <v-list-item-icon>
                    {{ product.cuantos }}
                </v-list-item-icon>

                <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="product.name"></v-list-item-title>

                    <v-list-item-subtitle v-text="product.sell_price"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn @click="plusProduct(product)" icon>
                        <v-icon color="grey lighten-1">mdi-plus-circle</v-icon>
                    </v-btn>
                </v-list-item-action>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-minus-circle-outline</v-icon>
                    </v-btn>
                </v-list-item-action>


            </v-list-item>
        </v-list>
    </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
    components: {
        carts: Array,
    },
    data() {
        return {
            carts: [],
        };
    },
    methods: {
        ...mapActions(['addProduct']),
        add(product) {
            let newproduct = {
                id: product.id,
                name: product.name,
                sell_price: product.sell_price,
                cuantos: 1,
            }
            /* let pro= this.carts.find(element=>{
              if(element.id==product.id){
                return element
              }
            }) */
            let pro = this.carts.find(element => element.id == product.id)


            if (pro == undefined) {
                this.carts.push(newproduct);
            }
            else {
                pro.cuantos = pro.cuantos + 1
            }

        },
        plusProduct(product) {
            this.carts.map(element => {
                if (element.id == product.id){
                    element.cuantos += 1;
                }
            });
        }
    },
    created() {
        this.$root.$on('addingProduct', (product) => {
            this.add(product)
        });
    },

}
</script>

<style lang="scss" scoped></style>