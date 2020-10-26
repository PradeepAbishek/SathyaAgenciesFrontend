<template>
  <div class="flex justify-center mt4 mb4">
    <v-card elevation="8" class="w-60-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                v-model="companyId"
                :items="states"
                :filter="customFilter"
                :color="color"
                item-text="name"
                item-value="id"
                label="Company Name"
                required
                :rules="mandatoryRule"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="productName"
                label="Product Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="gst"
                label="GST %"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="hsnCode"
                label="HSN Code"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="desc"
                label="Description"
                required
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6"></v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn color="primary" dark block @click="hideEditing">
                Close <v-icon class="ml-2"> mdi-close </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn :color="color" dark @click="updateProduct" block>
                Update Product <v-icon class="ml-2"> mdi-update </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Product",
  props: ["product"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    compantId: "",
    productName: "",
    gst: "",
    hsnCode: "",
    desc: "",
    states: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 },
    ],
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    hideEditing() {
      this.$emit("hideEditing");
    },
    updateProduct() {
      var valid = this.$refs.form.validate();
      if (valid) {
        console.log("Need to set update api to user");
        this.$emit("hideEditing");
      }
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.companyId = this.product.companyId;
    this.productName = this.product.productName;
    this.gst = this.product.gst;
    this.ifscCode = this.product.ifscCode;
    this.desc = this.product.desc;
  },
};
</script>
