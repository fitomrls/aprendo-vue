<template>
  <v-container>
    <v-row>
      <ProductList :products="products"/>

      <CartList/>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductList from '@/components/ProductList.vue';
import CartList from '@/components/CartList.vue';
export default {
  name: "Home",
  components: {
    ProductList,
    CartList,
  },
  methods: {
    ...mapActions(["retrieveProducts"]),
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
