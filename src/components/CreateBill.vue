<template>
  <div>
    <v-card elevation="8" rounded="3" outlined>
      <v-card dark>
        <v-card-text>
          <v-form ref="form1">
            <v-row>
              <v-col cols="12" md="3" sm="6">
                <v-autocomplete
                  v-model="customer"
                  :items="customerData"
                  item-text="customerName"
                  item-value="customerId"
                  label="Customer Name"
                  required
                  :rules="mandatoryRule"
                  return-object
                  :color="color"
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
                  :disabled="billItems"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="billDate"
                      label="Bill Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      :rules="mandatoryRule"
                      :color="color"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="billDate"
                    @input="date = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="3" sm="3">
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
                  :disabled="billItems"
                ></v-switch>
              </v-col>
              <v-col lg="12" md="12" sm="12">
                <v-textarea
                  label="Description"
                  rows="1"
                  v-model="description"
                  :color="color"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card elevation="8" rounded="3" class="mt-5" outlined>
      <v-card dark>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="4" sm="3">
                <v-autocomplete
                  v-model="product"
                  :filter="customFilter1"
                  :items="stockData"
                  :color="color"
                  item-text="productName"
                  item-value="_id"
                  label="Product Name"
                  required
                  :rules="mandatoryRule"
                  return-object
                  key="_id"
                >
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span>{{ data.item.productName }}</span>
                    <v-spacer></v-spacer>
                    <v-chip outlined label :color="color" class="fw9">
                      {{ data.item.unitPrice }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="4" sm="3">
                <v-text-field
                  v-model="productQuantity"
                  label="Product Quantity"
                  required
                  :rules="mandatoryRule"
                  :color="color"
                  :disabled="!product"
                  :hint="'Available Stock = ' + availableQuantity"
                  persistent-hint
                  type="number"
                  min="0"
                  :max="availableQuantity"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="3">
                <v-combobox
                  v-model="productUnitPrice"
                  label="Product Unit Price"
                  required
                  :rules="mandatoryRule"
                  :color="color"
                  :items="productPrices"
                  :disabled="!product"
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
                  {{ productPurchasePrice }}
                </v-chip>
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
                  disabled
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" :md="billType ? 4 : 3" sm="3" v-if="!billType">
                <v-text-field
                  v-model="sgstAmount"
                  label="SGST Amount"
                  disabled
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" :md="billType ? 4 : 3" sm="3" v-if="billType">
                <v-text-field
                  v-model="igstAmount"
                  label="IGST Amount"
                  disabled
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
                  disabled
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
              <v-btn :color="color" @click="addProduct" dark text small>
                Add Product<v-icon class="ml-2" small> mdi-plus </v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CreateBill",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    date: false,
    customer: "",
    customerName: "",
    customerId: "",
    customerGSTNumber: "",
    product: "",
    productName: "",
    productGST: "",
    productQuantity: "",
    productPrices: [],
    productUnitPrice: "",
    productPurchasePrice: 0,
    productHSNCode: "",
    billDate: new Date().toISOString().substr(0, 10),
    billType: false,
    description: "",
    freighCharge: 0,
    customerData: [],
    stockData: [],
    stockId: "",
    availableQuantity: 0,
  }),
  watch: {
    customer: function(val) {
      if (val) {
        this.customerName = val.customerName;
        this.customerId = val._id;
        this.customerGSTNumber = val.gstNumber;
        this.$store.commit("setBillCustomer", val);
        if (this.$store.state.billItems.length > 0) {
          this.$store.commit("resetBillItem", []);
          this.$refs.form.reset();
        }
      }
    },
    product: function(val) {
      if (val) {
        this.productName = val.productName;
        this.productGST = val.productGST;
        this.productPrices = val.sellingPrice;
        this.productHSNCode = val.productHSNCode;
        this.productPurchasePrice = val.unitPrice;
        this.availableQuantity = val.availableQuantity;
        this.stockId = val._id;
      }
    },
    billDate: function(val) {
      if (val) {
        this.$store.commit("setBillDate", val);
      }
    },
    freighCharge: function(val) {
      this.$store.commit("setBillFreighCharge", val);
    },
    description: function(val) {
      this.$store.commit("setBillDescription", val);
    },
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.customerName.toLowerCase();
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
        var billItem = {};
        billItem.stockId = this.stockId;
        billItem.productName = this.productName;
        billItem.productGST = this.productGST;
        billItem.productHSNCode = this.productHSNCode;
        billItem.productQuantity = this.productQuantity;
        billItem.productPurchasePrice = this.productPurchasePrice;
        billItem.productPrices = this.productPrices;
        billItem.productUnitPrice = this.productUnitPrice;
        billItem.productPrice = this.productPrice;
        billItem.productProfit =
          this.productPrice - this.productPurchasePrice * this.productQuantity;
        billItem.gstAmount = this.gstAmount;
        billItem.isIGSTBill = this.billType;
        if (!this.billType) {
          billItem.cgstAmount = this.cgstAmount;
          billItem.sgstAmount = this.sgstAmount;
        } else {
          billItem.igstAmount = this.gstAmount;
        }
        billItem.productTotalPrice = this.productPrice + this.gstAmount;
        billItem.availableQuantity = this.availableQuantity;
        this.$store.commit("updateBillItem", billItem);
        this.productPurchasePrice = 0;
        this.$refs.form.reset();
      }
    },
    getAllCustomers() {
      this.$axios
        .get("/customers/")
        .then((res) => {
          this.customerData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getBillStocks() {
      this.$axios
        .get("/stocks/bill")
        .then((res) => {
          this.stockData = res.data;
          console.log(this.stockData);
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
        return this.productQuantity * this.productUnitPrice;
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
    billItems() {
      return this.$store.state.billItems.length > 0 ? true : false;
    },
    productTotalPrice: {
      get() {
        return this.productPrice + this.gstAmount;
      },
      set() {},
    },
  },
  mounted() {
    this.getAllCustomers();
    this.getBillStocks();
    this.$store.commit("setBillDate", this.billDate);
    this.$store.commit("setBillFreighCharge", this.freighCharge);
  },
};
</script>
