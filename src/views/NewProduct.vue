<template>
  <v-container fluid tag="section">
    <v-card elevation="8" rounded="3"  outlined dark>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-autocomplete
                v-model="product.companyId"
                :items="companyData"
                :filter="customFilter"
                :color="color"
                item-text="companyName"
                item-value="_id"
                label="Company Name"
                required
                :rules="mandatoryRule"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="product.productName"
                label="Product Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="product.gst"
                label="GST %"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="product.hsnCode"
                label="HSN Code"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="product.description"
                label="Description"
                required
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addProduct" dark text small>
          Add Product<v-icon class="ml-2" small> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewBank",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    product: {
      companyId: "",
      productName: "",
      gst: "",
      hsnCode: "",
      description: "",
    },
    companyData: [],
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    addProduct() {
      var t = this.$refs.form.validate();
      if (t) {
        this.product.createdBy = this.$store.state.userName;
        this.$axios
          .post("/products/", this.product)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Product Created Successfully"
            );
            this.$router.push("/viewProduct");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
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
  },
};
</script>
