<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="productId"
      routeName="products"
      module="Product"
      v-if="deleteDialog"
      v-on:refreshData="getAllProducts"
    ></delete-confirmation>
    <v-card elevation="8" rounded="3" outlined dark>
      <v-data-table :headers="headers" :items="productData" :items-per-page="5">
        <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
          <v-icon small class="mr-2" @click="editProduct(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteProduct(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <product
      :product="editedProduct"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
      v-on:refreshProductData="getAllProducts"
    ></product>
  </v-container>
</template>
<script>
import Product from "@/components/Product";
import DeleteConfirmation from "@/components/DeleteConfirmation";
export default {
  name: "ViewProduct",
  components: {
    Product,
    DeleteConfirmation,
  },
  data: () => ({
    enableEditing: false,
    editedProduct: {},
    productData: [],
    productId: "",
  }),
  computed: {
    headers() {
      return this.$store.state.productHeaders;
    },
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  methods: {
    editProduct(item) {
      this.editedProduct = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
    getAllProducts() {
      this.$axios
        .get("/products/")
        .then((res) => {
          this.productData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    deleteProduct(item) {
      this.productId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>
