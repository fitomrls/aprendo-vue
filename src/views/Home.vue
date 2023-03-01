<template>
  <v-container>
    <v-row>
      <v-col col="6" md="6" sm="12">
        <v-list subheader two-line>
          <v-subheader inset>Productos</v-subheader>

          <v-list-item v-for="product in products" :key="product.id">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="product.name"></v-list-item-title>

              <v-list-item-subtitle
                v-text="product.sell_price"
              ></v-list-item-subtitle>
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

      <v-col col="6" md="6" sm="12">
        <v-list subheader two-line dark>
          <v-subheader inset>Carrito</v-subheader>

          <v-list-item v-for="product in carts" :key="product.id">
              <v-list-item-icon>
                {{product.cuantos}}
              </v-list-item-icon> 

            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="product.name"></v-list-item-title>

              <v-list-item-subtitle
                v-text="product.sell_price"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      carts: [],
    };
  },

  methods: {
    ...mapActions(["retrieveProducts"]),
    add(product) {
      let newproduct={
        id:product.id,
        name:product.name,
        sell_price:product.sell_price,
        cuantos:1,
      }
      /* let pro= this.carts.find(element=>{
        if(element.id==product.id){
          return element
        }
      }) */
      let pro= this.carts.find(element=>element.id==product.id)
           
      
      if(pro==undefined){
        this.carts.push(newproduct);
      }
      else{
        pro.cuantos=pro.cuantos+1
      }
      
    },
  },
  computed: {
    ...mapGetters(["products"]),
  },

  created() {
    this.retrieveProducts();
  },
};
</script>

<style lang="scss" scoped></style>
