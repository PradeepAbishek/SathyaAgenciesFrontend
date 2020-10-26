<template>
  <div>
    <div class="flex justify-center mt4">
      <v-card elevation="8" class="w-60-l w-50-m w-50" rounded="3">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
          <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
            <v-icon
              small
              class="mr-2"
              @click="editProduct(item)"
              color="primary"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteProduct(item)" color="error">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <product
      :product="editedProduct"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
    ></product>
  </div>
</template>
<script>
import Product from "@/components/Product";
export default {
  name: "ViewProduct",
  components: {
    Product,
  },
  data: () => ({
    enableEditing: false,
    editedProduct: {},
    desserts: [
      {
        companyName: "Test",
        companyId: 1,
        productName: "wef",
        gst: 12345,
        ifscCode: 1234567,
        desc: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        productName: "wef",
        gst: 12345,
        ifscCode: 1234567,
        desc: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        productName: "wef",
        gst: 12345,
        ifscCode: 1234567,
        desc: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        productName: "wef",
        gst: 12345,
        ifscCode: 1234567,
        desc: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        productName: "wef",
        gst: 12345,
        ifscCode: 1234567,
        desc: "sdf",
      },
    ],
  }),
  computed: {
    headers() {
      return this.$store.state.productHeaders;
    },
  },
  methods: {
    editProduct(item) {
      console.log(item);
      this.editedProduct = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
  },
};
</script>
