<template>
  <div>
    <v-card elevation="8" rounded="3" outlined dark>
      <v-card-text>
        <v-form ref="form1">
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <v-autocomplete
                v-model="company"
                :items="companyData"
                :filter="customFilter"
                :color="color"
                item-text="companyName"
                label="Company Name"
                required
                :rules="mandatoryRule"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3" sm="4">
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
                    :color="color"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="purchaseDate"
                  @input="date = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3" sm="4">
              <v-text-field
                v-model="freighCharge"
                label="Freigh Charge"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="2">
              <v-switch
                v-model="billType"
                inset
                label="Is IGST Bill ?"
                :color="color"
                :disabled="purchaseItems"
              ></v-switch>
            </v-col>
            <v-col lg="10" md="12" sm="12">
              <v-textarea
                label="Description"
                rows="1"
                v-model="description"
                :color="color"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="2" sm="4">
              <v-text-field
                v-model="otherAmount"
                label="Other Amount"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card elevation="8" rounded="3" class="mt-5" dark outlined>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="3" sm="3">
              <v-autocomplete
                v-model="product"
                :items="productData"
                :filter="customFilter1"
                :color="color"
                item-text="productName"
                label="Product Name"
                required
                :rules="mandatoryRule"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3" sm="3">
              <v-text-field
                v-model="productQuantity"
                label="Product Quantity"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="3">
              <v-text-field
                v-model="unitPrice"
                label="Product Unit Price"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-combobox
                v-model="sellingPrice"
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
            <v-col cols="12" :md="billType ? 4 : 3" sm="3">
              <v-text-field
                v-model="productGST"
                label="GST %"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" :md="billType ? 4 : 3" sm="3">
              <v-text-field
                v-model="productHSNCode"
                label="HSN Code"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" :md="billType ? 4 : 3" sm="3" v-if="!billType">
              <v-text-field
                v-model="cgstAmount"
                label="CGST Amount"
                required
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" :md="billType ? 4 : 3" sm="3" v-if="!billType">
              <v-text-field
                v-model="sgstAmount"
                label="SGST Amount"
                required
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" :md="billType ? 4 : 3" sm="3" v-if="billType">
              <v-text-field
                v-model="igstAmount"
                label="IGST Amount"
                required
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="3">
              <v-text-field
                v-model="productPrice"
                label="Product Price"
                disabled
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="3">
              <v-text-field
                v-model="gstAmount"
                label="GST Amount"
                required
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="3">
              <v-text-field
                v-model="productTotalPrice"
                label="Product Total Price (Including GST)"
                disabled
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn :color="color" @click="addProduct" dark small text>
              Add Product <v-icon class="ml-2" small> mdi-plus </v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CreatePurchase",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    mandatoryRule1: [(v) => (v && v.length > 1) || "Mandatory Field"],
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
    purchaseDate: new Date().toISOString().substr(0, 10),
    companyData: [],
    billType: false,
    productData: [],
    productHSNCode: "",
    description: "",
    freighCharge: 0,
    otherAmount: 0,
  }),
  watch: {
    company: function(val) {
      if (val) {
        this.companyName = val.companyName;
        this.companyId = val._id;
        this.$store.commit("setPurchaseCompany", val);
        this.getProductsByCompany();
        if (this.$store.state.purchaseItems.length > 0) {
          this.$store.commit("resetPurchaseItem", []);
          this.$refs.form.reset();
        }
      }
    },
    product: function(val) {
      if (val) {
        this.productName = val.productName;
        this.productId = val._id;
        this.productGST = val.gst;
        this.productHSNCode = val.hsnCode;
      }
    },
    purchaseDate: function(val) {
      if (val) {
        this.$store.commit("setPurchaseDate", val);
      }
    },
    freighCharge: function(val) {
      this.$store.commit("setPurchaseFreighCharge", val);
    },
    description: function(val) {
      this.$store.commit("setPurchaseDescription", val);
    },
    otherAmount: function(val) {
      this.$store.commit("setPurchaseOtherAmount", val);
    },
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    customFilter1(item, queryText, itemText) {
      const textOne = item.productName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    addProduct() {
      var form2 = this.$refs.form.validate();
      var form1 = this.$refs.form1.validate();
      if (form2 && form1) {
        var purchaseItem = {};
        purchaseItem.productName = this.productName;
        purchaseItem.productGST = this.productGST;
        purchaseItem.productHSNCode = this.productHSNCode;
        purchaseItem.productQuantity = this.productQuantity;
        purchaseItem.unitPrice = this.unitPrice;
        purchaseItem.productPrice = this.productPrice;
        purchaseItem.gstAmount = this.gstAmount;
        purchaseItem.isIGSTBill = this.billType;
        purchaseItem.sellingPrice = this.sellingPrice;
        if (!this.billType) {
          purchaseItem.cgstAmount = this.cgstAmount;
          purchaseItem.sgstAmount = this.sgstAmount;
        } else {
          purchaseItem.igstAmount = this.gstAmount;
        }
        purchaseItem.productTotalPrice = this.productPrice + this.gstAmount;
        this.$store.commit("updatePurchaseItem", purchaseItem);
        this.$refs.form.reset();
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
    getProductsByCompany() {
      this.$axios
        .get("/products/company/" + this.companyId)
        .then((res) => {
          this.productData = res.data;
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
    productPrice: {
      get() {
        return this.productQuantity * this.unitPrice;
      },
      set() {},
    },
    gstAmount: {
      get() {
        return (this.productPrice * this.productGST) / 100;
      },
      set() {},
    },
    igstAmount: {
      get() {
        return (this.productPrice * this.productGST) / 100;
      },
      set() {},
    },
    cgstAmount: {
      get() {
        return (this.productPrice * (this.productGST / 2)) / 100;
      },
      set() {},
    },
    sgstAmount: {
      get() {
        return (this.productPrice * (this.productGST / 2)) / 100;
      },
      set() {},
    },
    purchaseItems() {
      return this.$store.state.purchaseItems.length > 0 ? true : false;
    },
    productTotalPrice: {
      get() {
        return this.productPrice + this.gstAmount;
      },
      set() {},
    },
  },
  mounted() {
    this.$store.commit("setPurchaseDate", this.purchaseDate);
    this.$store.commit("setPurchaseOtherAmount", this.otherAmount);
    this.$store.commit("setPurchaseFreighCharge", this.freighCharge);
    this.getAllCompanies();
  },
};
</script>
