<template>
  <v-container tag="section" fluid>
    <v-dialog v-model="verificationDialog" width="200" persistent>
      <v-card>
        <v-card-text class="pa-6">
          Are you sure want to confirm the Return cum Payment?
        </v-card-text>
        <v-card-actions class="px-6">
          <v-btn text color="primary" @click="closeVerificationDialog" small>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="confirmReturn" small>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card elevation="8" dark>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="4" sm="4">
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
                    v-model="returnDate"
                    label="Return Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    required
                    :rules="mandatoryRule"
                    :color="color"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="returnDate"
                  @input="date = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-autocomplete
                v-model="customer"
                :items="customerData"
                :color="color"
                item-text="customerName"
                item-value="customerId"
                label="Customer Name"
                required
                :rules="mandatoryRule"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-select
                v-model="bill"
                :items="bills"
                :color="color"
                label="Bill Number"
                :rules="mandatoryRule"
                item-text="billNumber"
                item-value="billNumber"
                return-object
                hide-selected
                :disabled="returnItems.length > 0"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-form ref="form1">
          <v-row>
            <v-col cols="12" sm="4" md="3">
              <v-select
                v-model="product"
                :items="purchasedProducts"
                :color="color"
                label="Product Name"
                :rules="mandatoryRule"
                item-text="productName"
                return-object
                hide-selected
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="productQuantity"
                label="Product Quantity"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                :disabled="!product"
                :hint="'Purchased Quantity = ' + purchasedProductQuantity"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="productGST"
                label="Product GST %"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="productHSNCode"
                label="Product HSN Code"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="productUnitPrice"
                label="Product Unit Price"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="cgstAmount"
                label="CGST Amount"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="sgstAmount"
                label="SGST Amount"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="gstAmount"
                label="GST Amount"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="productPrice"
                label="Product Price"
                required
                disabled
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="productTotalPrice"
                label="Product Total Price"
                required
                disabled
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
    <v-card dark class="mt-5">
      <v-data-table :headers="returnHeaders" :items="returnItems">
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="color"
          class="ttu"
          @click="verifyReturnItems()"
          v-if="returnItems.length > 0"
          text
          small
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Returns",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    date: false,
    returnDate: new Date().toISOString().substr(0, 10),
    customerData: [],
    customer: "",
    billNumber: "",
    bills: [],
    purchasedProducts: [],
    purchasedProductQuantity: "",
    stockId: "",
    product: "",
    productName: "",
    productGST: "",
    productQuantity: "",
    productUnitPrice: "",
    productHSNCode: "",
    productPurchasePrice: "",
    returnHeaders: [
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Product HSN Code",
        value: "productHSNCode",
        sortable: false,
      },
      {
        text: "GST %",
        value: "productGST",
        sortable: false,
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "productUnitPrice",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "productPrice",
        sortable: false,
      },
      {
        text: "GST Amount",
        value: "gstAmount",
        sortable: false,
      },
      {
        text: "CGST Amount",
        value: "cgstAmount",
        sortable: false,
      },
      {
        text: "SGST Amount",
        value: "sgstAmount",
        sortable: false,
      },
      {
        text: "Product Total Price",
        value: "productTotalPrice",
        sortable: false,
      },
    ],
    verificationDialog: false,
    customerId: "",
    bill: "",
  }),
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
    productTotalPrice: {
      get() {
        return this.productPrice + this.gstAmount;
      },
      set() {},
    },
    returnItems() {
      return this.$store.state.returnItems;
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
    totalReturnPrice() {
      var total = 0;
      for (var i = 0; i < this.$store.state.returnItems.length; i++) {
        total += this.$store.state.returnItems[i].productTotalPrice;
      }
      return Math.round(total);
    },
    totalReturnGSTAmount() {
      var gstAmount = 0;
      for (var i = 0; i < this.$store.state.returnItems.length; i++) {
        gstAmount += this.$store.state.returnItems[i].gstAmount;
      }
      return gstAmount;
    },
    totalReturnProductAmount() {
      var productPrice = 0;
      for (var i = 0; i < this.$store.state.returnItems.length; i++) {
        productPrice += this.$store.state.returnItems[i].productPrice;
      }
      return productPrice;
    },
    totalProfit() {
      var profit = 0;
      for (var i = 0; i < this.$store.state.returnItems.length; i++) {
        profit += this.$store.state.returnItems[i].productProfit;
      }
      return Math.round(profit);
    },
  },
  methods: {
    closeVerificationDialog() {
      this.verificationDialog = false;
    },
    verifyReturnItems() {
      this.verificationDialog = true;
    },
    confirmReturn() {
      var returnMaster = {};
      returnMaster.billNumber = this.billNumber;
      returnMaster.customerId = this.customerId;
      returnMaster.returnDate = this.returnDate;
      returnMaster.isIGSTBill = false;
      returnMaster.totalProductCount = this.returnItems.length;
      returnMaster.totalGSTAmount = this.totalReturnGSTAmount;
      returnMaster.totalProductAmount = this.totalReturnProductAmount;
      returnMaster.totalReturnAmount = this.totalReturnPrice;
      returnMaster.totalProfit = this.totalProfit;
      returnMaster.returnDetails = this.$store.state.returnItems;
      returnMaster.createdBy = this.$store.state.userName;
      this.$axios
        .post("/returns/", returnMaster)
        .then((res) => {
          this.createReturnPayment(res.data[0]);
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
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
    addProduct() {
      var form = this.$refs.form1.validate();
      if (form) {
        var returnItem = {};
        returnItem.stockId = this.stockId;
        returnItem.productName = this.productName;
        returnItem.productHSNCode = this.productHSNCode;
        returnItem.productGST = this.productGST;
        returnItem.productQuantity = this.productQuantity;
        returnItem.productUnitPrice = this.productUnitPrice;
        returnItem.gstAmount = this.gstAmount;
        returnItem.cgstAmount = this.cgstAmount;
        returnItem.sgstAmount = this.sgstAmount;
        returnItem.productPrice = this.productPrice;
        returnItem.productTotalPrice = this.productTotalPrice;
        returnItem.productPurchasePrice = this.productPurchasePrice;
        returnItem.purchasedProductQuantity = this.purchasedProductQuantity;
        returnItem.productProfit =
          this.productPurchasePrice * this.productQuantity - this.productPrice;
        this.$store.commit("updateReturnItem", returnItem);
        this.$refs.form1.reset();
      }
    },
    createReturnPayment(data) {
      var paymentData = {};
      paymentData.customerId = data.customerId;
      paymentData.paymentDate = data.returnDate;
      paymentData.paidAmount = data.totalReturnAmount;
      paymentData.balanceAmountBeforePayment =
        data.customerDetails.currentBalanceAmount;
      paymentData.balanceAmountAfterPayment =
        data.customerDetails.currentBalanceAmount - data.totalReturnAmount;
      paymentData.paymentMode = "Return";
      paymentData.createdBy = this.$store.state.userName;
      paymentData.reference = "Bill Number - " + data.billNumber;
      paymentData.returnId = data._id;
      this.$axios
        .post("/payments/customer", paymentData)
        .then((res) => {
          this.updateCustomerPayments(
            res.data[0].customerId,
            res.data[0]._id,
            res.data[0].paidAmount
          );
          this.$store.commit("successSnackbar", "Payment Created Successfully");
          this.$router.push("/viewPayment");
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    updateCustomerPayments(customerId, paymentId, paidAmount) {
      var paymentData = {};
      paymentData.paymentId = paymentId;
      paymentData.paidAmount = paidAmount;
      this.$axios
        .put("/customers/updatePayments/" + customerId, paymentData)
        .then((res) => console.log(res))
        .catch((err) =>
          this.$store.commit("errorSnackbar", err.response.data.detail)
        );
    },
  },
  watch: {
    customer: function(val) {
      this.customerId = val._id;
      if (val && val.bills.length > 0) {
        this.bills = val.bills;
      } else {
        this.bills = [];
      }
      if (this.returnItems.length > 0) {
        this.$store.commit("resetReturnItem", []);
        this.billNumber = "";
        this.$refs.form1.reset();
      }
    },
    bill: function(val) {
      if (val) {
        this.billNumber = val.billNumber;
        this.purchasedProducts = val.billDetails;
      }
    },
    product: function(val) {
      if (val) {
        this.stockId = val.stockId;
        this.productName = val.productName;
        this.productGST = val.productGST;
        this.productUnitPrice = val.productUnitPrice;
        this.purchasedProductQuantity = val.productQuantity;
        this.productPurchasePrice = val.productPurchasePrice;
        this.productHSNCode = val.productHSNCode;
      }
    },
  },
  mounted() {
    this.getAllCustomers();
  },
};
</script>
