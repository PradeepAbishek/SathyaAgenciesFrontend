<template>
  <v-card elevation="8" class="w-100" rounded="3"  outlined>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="purchaseItem.productQuantity"
              label="Product Quantity"
              required
              :rules="mandatoryRule"
              :color="color"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="purchaseItem.unitPrice"
              label="Product Unit Price"
              required
              :rules="mandatoryRule"
              :color="color"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-combobox
              v-model="purchaseItem.sellingPrice"
              hide-selected
              label="Product Selling Price"
              multiple
              small-chips
              :color="color"
              required
              :rules="mandatoryRule1"
              type="number"
              min="0"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" :md="purchaseItem.isIGSTBill ? 4 : 3" sm="3">
            <v-text-field
              v-model="purchaseItem.productGST"
              label="GST %"
              required
              disabled
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="purchaseItem.isIGSTBill ? 4 : 3" sm="3">
            <v-text-field
              v-model="purchaseItem.productHSNCode"
              label="HSN Code"
              required
              disabled
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="purchaseItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="!purchaseItem.isIGSTBill"
          >
            <v-text-field
              v-model="purchaseItem.cgstAmount"
              label="CGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="purchaseItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="!purchaseItem.isIGSTBill"
          >
            <v-text-field
              v-model="purchaseItem.sgstAmount"
              label="SGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="purchaseItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="purchaseItem.isIGSTBill"
          >
            <v-text-field
              v-model="purchaseItem.igstAmount"
              label="IGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="purchaseItem.productPrice"
              label="Product Price"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="purchaseItem.gstAmount"
              label="GST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="purchaseItem.productTotalPrice"
              label="Product Total Price (Including GST)"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="closeModal" small text>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateProduct" small text>
            Update Product <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
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
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    mandatoryRule1: [(v) => (v && v.length > 1) || "Mandatory Field"],
  }),
  methods: {
    updateProduct() {
      var form = this.$refs.form.validate();
      if (form) {
        Object.assign(
          this.$store.state.purchaseItems[this.purchaseItemIndex],
          this.purchaseItem
        );
        this.$emit("hideDialog");
      }
    },
    closeModal() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  watch: {
    "purchaseItem.unitPrice": function(val) {
      this.purchaseItem.productPrice = val * this.purchaseItem.productQuantity;
      this.purchaseItem.gstAmount =
        (this.purchaseItem.productPrice * this.purchaseItem.productGST) / 100;
      if (this.purchaseItem.isIGSTBill) {
        this.purchaseItem.igstAmount =
          (this.purchaseItem.productPrice * this.purchaseItem.productGST) / 100;
      } else {
        this.purchaseItem.cgstAmount =
          (this.purchaseItem.productPrice *
            (this.purchaseItem.productGST / 2)) /
          100;
        this.purchaseItem.sgstAmount =
          (this.purchaseItem.productPrice *
            (this.purchaseItem.productGST / 2)) /
          100;
      }
      this.purchaseItem.productTotalPrice =
        this.purchaseItem.productPrice + this.purchaseItem.gstAmount;
    },
    "purchaseItem.productQuantity": function(val) {
      this.purchaseItem.productPrice = val * this.purchaseItem.unitPrice;
      this.purchaseItem.gstAmount =
        (this.purchaseItem.productPrice * this.purchaseItem.productGST) / 100;
      if (this.purchaseItem.isIGSTBill) {
        this.purchaseItem.igstAmount =
          (this.purchaseItem.productPrice * this.purchaseItem.productGST) / 100;
      } else {
        this.purchaseItem.cgstAmount =
          (this.purchaseItem.productPrice *
            (this.purchaseItem.productGST / 2)) /
          100;
        this.purchaseItem.sgstAmount =
          (this.purchaseItem.productPrice *
            (this.purchaseItem.productGST / 2)) /
          100;
      }
      this.purchaseItem.productTotalPrice =
        this.purchaseItem.productPrice + this.purchaseItem.gstAmount;
    },
  },
};
</script>
