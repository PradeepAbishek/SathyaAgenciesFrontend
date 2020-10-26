<template>
  <v-card elevation="8" class="w-100" rounded="3">
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="unitPrice"
              label="Unit Price"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="productQuantity"
              label="Product Quantity"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="productPrice"
              label="Product Total Price"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
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
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="productGST"
              label="GST %"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="gstAmount"
              label="GST Amount"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-btn color="primary" dark @click="updatePurchaseModalState" block>
              Close <v-icon class="ml-2"> mdi-update </v-icon>
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
</template>
<script>
export default {
  name: "Purchase",
  props: ["purchaseItem", "purchaseItemIndex"],
  data: () => ({
    productGST: "",
    unitPrice: "",
    productQuantity: "",
    productPrice: "",
    sellingPrice: "",
    gstAmount: "",
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
  }),
  methods: {
    updateProduct() {
      this.purchaseItem.unitPrice = this.unitPrice;
      this.purchaseItem.productQuantity = this.productQuantity;
      this.purchaseItem.productPrice = this.productPrice;
      this.purchaseItem.sellingPrice = this.sellingPrice;
      this.purchaseItem.gstAmount = this.gstAmount;
      Object.assign(
        this.$store.state.purchaseItems[this.purchaseItemIndex],
        this.purchaseItem
      );
      this.$store.commit("updatePurchaseModalState", false);
    },
    updatePurchaseModalState() {
      this.$store.commit("updatePurchaseModalState", false);
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  watch: {
    unitPrice: function(val) {
      this.productPrice = val * this.productQuantity;
      this.gstAmount = (this.productPrice * this.productGST) / 100;
    },
    productQuantity: function(val) {
      this.productPrice = val * this.unitPrice;
      this.gstAmount = (this.productPrice * this.productGST) / 100;
    },
  },
  mounted() {
    this.productGST = this.purchaseItem.productGST;
    this.unitPrice = this.purchaseItem.unitPrice;
    this.productQuantity = this.purchaseItem.productQuantity;
    this.productPrice = this.purchaseItem.productPrice;
    this.sellingPrice = this.purchaseItem.sellingPrice;
    this.gstAmount = this.purchaseItem.gstAmount;
  },
};
</script>
