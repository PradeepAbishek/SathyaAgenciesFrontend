<template>
  <div>
    <div class="flex justify-center mt3">
      <v-card elevation="8" class="w-90-l w-90-m w-90" rounded="3">
        <v-card-text>
          <v-form ref="form1">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-autocomplete
                  v-model="company"
                  :items="states"
                  :filter="customFilter"
                  :color="color"
                  item-text="companyName"
                  label="Company Name"
                  required
                  :rules="mandatoryRule"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-menu
                  v-model="date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="purchaseDate"
                      label="Purchase Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      :rules="mandatoryRule"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="purchaseDate"
                    @input="date = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <div class="flex justify-center mt3">
      <v-card elevation="8" class="w-90-l w-90-m w-90" rounded="3">
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="3" sm="3">
                <v-autocomplete
                  v-model="product"
                  :items="states"
                  :filter="customFilter"
                  :color="color"
                  item-text="companyName"
                  label="Product Name"
                  required
                  :rules="mandatoryRule"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="productGST"
                  label="GST %"
                  required
                  disabled
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="unitPrice"
                  label="Unit Price"
                  required
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="productQuantity"
                  label="Product Quantity"
                  required
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="productPrice"
                  label="Product Total Price"
                  disabled
                  required
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-combobox
                  v-model="sellingPrice"
                  hide-selected
                  label="Selling Price"
                  multiple
                  small-chips
                  :color="color"
                >
                </v-combobox>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="gstAmount"
                  label="GST Amount"
                  disabled
                  required
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col class="self-center" cols="12" sm="3" md="3">
                <v-btn :color="color" @click="addProduct" dark block>
                  Add Product<v-icon class="ml-2"> mdi-update </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreatePurchase",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    date: false,
    company: "",
    product: "",
    companyName: "",
    companyId: "",
    productName: "",
    productId: "",
    productGST: "",
    unitPrice: "",
    productQuantity: "",
    sellingPrice: "",
    purchaseDate: "",
    states: [
      { companyId: 1, companyName: "Florida", abbr: "FL", gst: 1 },
      { companyId: 2, companyName: "Georgia", abbr: "GA", gst: 2 },
      { companyId: 3, companyName: "Nebraska", abbr: "NE", gst: 3 },
      { companyId: 4, companyName: "California", abbr: "CA", gst: 4 },
      { companyId: 5, companyName: "New York", abbr: "NY", gst: 5 },
    ],
  }),
  watch: {
    company: function(val) {
      if (val) {
        this.companyName = val.companyName;
        this.companyId = val.companyId;
        this.$store.commit("setPurchaseCompany", this.company);
        this.$store.commit("resetPurchaseItem", []);
      }
    },
    product: function(val) {
      if (val) {
        this.productName = val.companyName;
        this.productId = val.companyId;
        this.productGST = val.gst;
      }
    },
    purchaseDate: function(val) {
      if (val) {
        this.$store.commit("setPurchaseDate", val);
      }
    },
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    addProduct() {
      var form2 = this.$refs.form.validate();
      var form1 = this.$refs.form1.validate();
      if (form2 && form1) {
        var purchaseItem = {};
        purchaseItem.companyName = this.company.companyName;
        purchaseItem.companyId = this.company.companyId;
        purchaseItem.productName = this.product.companyName;
        purchaseItem.productId = this.product.companyId;
        purchaseItem.productGST = this.product.gst;
        purchaseItem.unitPrice = this.unitPrice;
        purchaseItem.productPrice = this.productPrice;
        purchaseItem.productQuantity = this.productQuantity;
        purchaseItem.sellingPrice = this.sellingPrice;
        purchaseItem.gstAmount = this.gstAmount;
        purchaseItem.purchaseDate = this.purchaseDate;
        this.$store.commit("updatePurchaseItem", purchaseItem);
        this.$refs.form.reset();
      }
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    productPrice() {
      return this.productQuantity * this.unitPrice;
    },
    gstAmount() {
      return (this.productPrice * this.productGST) / 100;
    },
  },
};
</script>
