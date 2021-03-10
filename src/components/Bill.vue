<template>
  <v-card elevation="8" class="w-100" rounded="3" outlined>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="3">
            <v-text-field
              v-model="billItem.productQuantity"
              label="Product Quantity"
              required
              :rules="mandatoryRule"
              :color="color"
              :hint="'Available Stock = ' + billItem.availableQuantity"
              persistent-hint
              type="number"
              min="0"
              :max="billItem.availableQuantity"
              :onchange="
                Number(this.productQuantity) >
                Number(billItem.availableQuantity)
                  ? (this.productQuantity = billItem.availableQuantity)
                  : ''
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="5">
            <v-combobox
              v-model="billItem.productUnitPrice"
              label="Product Unit Price"
              required
              :rules="mandatoryRule"
              :color="color"
              :items="billItem.productPrices"
              type="number"
              min="0"
            ></v-combobox>
          </v-col>
          <v-col
            cols="12"
            md="1"
            sm="3"
            class="flex flex-column align-center justify-center"
          >
            <v-chip outlined label :color="color" class="fw9">
              {{ billItem.productPurchasePrice }}
            </v-chip>
          </v-col>
          <v-col cols="12" :md="billItem.isIGSTBill ? 4 : 3" sm="3">
            <v-text-field
              v-model="billItem.productGST"
              label="GST %"
              required
              disabled
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="billItem.isIGSTBill ? 4 : 3" sm="3">
            <v-text-field
              v-model="billItem.productHSNCode"
              label="HSN Code"
              required
              disabled
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="billItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="!billItem.isIGSTBill"
          >
            <v-text-field
              v-model="billItem.cgstAmount"
              label="CGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="billItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="!billItem.isIGSTBill"
          >
            <v-text-field
              v-model="billItem.sgstAmount"
              label="SGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="billItem.isIGSTBill ? 4 : 3"
            sm="3"
            v-if="billItem.isIGSTBill"
          >
            <v-text-field
              v-model="billItem.igstAmount"
              label="IGST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="billItem.productPrice"
              label="Product Price"
              disabled
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="billItem.gstAmount"
              label="GST Amount"
              disabled
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="billItem.productTotalPrice"
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
  name: "Bill",
  props: ["billItem", "billItemIndex"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    unitPrice: "",
    productQuantity: "",
    productPrice: "",
    productGST: "",
    gstAmount: "",
    sgstAmount: "",
    cgstAmount: "",
    igstAmount: "",
    productPrices: [],
    billType: "",
  }),
  methods: {
    updateProduct() {
      var form = this.$refs.form.validate();
      if (form) {
        Object.assign(
          this.$store.state.billItems[this.billItemIndex],
          this.billItem
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
    "billItem.productUnitPrice": function(val) {
      this.billItem.productPrice = val * this.billItem.productQuantity;
      this.billItem.gstAmount =
        (this.billItem.productPrice * this.billItem.productGST) / 100;
      if (this.billItem.isIGSTBill) {
        this.billItem.igstAmount =
          (this.billItem.productPrice * this.billItem.productGST) / 100;
      } else {
        this.billItem.cgstAmount =
          (this.billItem.productPrice * (this.billItem.productGST / 2)) / 100;
        this.billItem.sgstAmount =
          (this.billItem.productPrice * (this.billItem.productGST / 2)) / 100;
      }
      this.billItem.productTotalPrice =
        this.billItem.productPrice + this.billItem.gstAmount;
      this.billItem.productProfit =
        this.billItem.productPrice -
        this.billItem.productPurchasePrice * this.billItem.productQuantity;
    },
    "billItem.productQuantity": function(val) {
      if (val > this.billItem.availableQuantity) {
        console.log(val);
        val = this.billItem.availableQuantity;
        console.log(val);
        console.log(this.billItem.availableQuantity)
        this.billItem.productQuantity = this.billItem.availableQuantity;
      }
      this.billItem.productPrice = val * this.billItem.productUnitPrice;
      this.billItem.gstAmount =
        (this.billItem.productPrice * this.billItem.productGST) / 100;
      if (this.billItem.isIGSTBill) {
        this.billItem.igstAmount =
          (this.billItem.productPrice * this.billItem.productGST) / 100;
      } else {
        this.billItem.cgstAmount =
          (this.billItem.productPrice * (this.billItem.productGST / 2)) / 100;
        this.billItem.sgstAmount =
          (this.billItem.productPrice * (this.billItem.productGST / 2)) / 100;
      }
      this.billItem.productTotalPrice =
        this.billItem.productPrice + this.billItem.gstAmount;
      this.billItem.productProfit =
        this.billItem.productPrice -
        this.billItem.productPurchasePrice * this.billItem.productQuantity;
    },
  },
};
</script>
