<template>
  <v-card elevation="8" rounded="3" class="mt-5" dark>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
              v-model="editedProduct.companyId"
              :items="companyData"
              :filter="customFilter"
              :color="color"
              item-text="companyName"
              item-value="_id"
              label="Company Name"
              required
              :rules="mandatoryRule"
              disabled
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedProduct.productName"
              label="Product Name"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedProduct.gst"
              label="GST %"
              required
              :rules="mandatoryRule"
              :color="color"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedProduct.hsnCode"
              label="HSN Code"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="6">
            <v-text-field
              v-model="editedProduct.description"
              label="Description"
              required
              :color="color"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="hideEditing" text small>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateProduct" text small>
            Update Product <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Product",
  props: ["product"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    editedProduct: {
      companyId: "",
      productName: "",
      gst: "",
      hsnCode: "",
      description: "",
    },
    companyData: [],
    productId: "",
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    hideEditing() {
      this.$emit("hideEditing");
    },
    async updateProduct() {
      var valid = this.$refs.form.validate();
      if (valid) {
        await this.$axios
          .put("/products/" + this.productId, this.editedProduct)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Product Details Updated Successfully"
            );
            this.$emit("refreshProductData");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
        this.$emit("hideEditing");
      }
    },
    getAllCompanies() {
      this.$axios
        .get("/companies/")
        .then((res) => {
          this.companyData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.getAllCompanies();
    this.editedProduct.companyId = this.product.companyId;
    this.editedProduct.productName = this.product.productName;
    this.editedProduct.gst = this.product.gst;
    this.editedProduct.hsnCode = this.product.hsnCode;
    this.editedProduct.description = this.product.description;
    this.productId = this.product._id;
  },
};
</script>
