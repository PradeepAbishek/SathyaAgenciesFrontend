<template>
  <v-container fluid tag="section">
    <v-card dark :color="color" outlined class="pa-2 mt-3" elevation="4">
      <v-chip label outlined color="indigo" small class="ttu mt-3">
        Customer
      </v-chip>
      <v-row>
        <v-col sm="12" md="3" lg="6">
          <v-text-field
            v-model="customerSearch"
            label="Search"
            clearable
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>
        <v-col sm="12" md="3" lg="5">
          <v-autocomplete
            v-model="customerId"
            :items="customerData"
            item-text="customerName"
            item-value="_id"
            label="Customer Name"
            clearable
            outlined
          ></v-autocomplete>
        </v-col>
        <v-col sm="12" md="3" lg="1">
          <v-btn
            class="ma-2"
            text
            icon
            color="white"
            @click="printCustomerPayments()"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <view-payment-details
        :headers="paymentHeaders"
        :item="paymentData"
        :search="customerSearch"
        ref="customerPayment"
        type="view"
      ></view-payment-details>
    </v-card>

    <v-card dark :color="color" outlined class="mt-3 pa-2" elevation="4">
      <v-chip label outlined color="indigo" small class="ttu mt-3">
        Company
      </v-chip>
      <v-row dark>
        <v-col sm="12" md="3" lg="6">
          <v-text-field
            v-model="companySearch"
            label="Search"
            clearable
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>
        <v-col sm="12" md="3" lg="5">
          <v-autocomplete
            v-model="companyId"
            :items="companyData"
            item-text="companyName"
            item-value="_id"
            label="Company Name"
            clearable
            outlined
          ></v-autocomplete>
        </v-col>
        <v-col sm="12" md="3" lg="1">
          <v-btn
            class="ma-2"
            text
            icon
            color="white"
            @click="printCompanyPayments()"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <view-payment-details
        :headers="paymentCompanyHeaders"
        :item="paymentCompanyData"
        :search="companySearch"
        ref="companyPayment"
        type="view"
      ></view-payment-details>
    </v-card>
  </v-container>
</template>
<script>
import ViewPaymentDetails from "@/components/ViewPaymentDetails";
import print from "../print/index";
export default {
  name: "ViewPayment",
  components: {
    ViewPaymentDetails,
  },
  data: () => ({
    companySearch: "",
    companyId: "",
    companyData: [],
    customerSearch: "",
    customerId: "",
    customerData: [],
    paymentHeaders: [
      {
        text: "Payment Number",
        value: "paymentNumber",
        sortable: false,
      },
      {
        text: "Customer Name",
        value: "customerDetails.customerName",
        sortable: false,
      },
      {
        text: "Payment Date",
        value: "paymentDate",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount -  Before",
        value: "balanceAmountBeforePayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Paid Amount",
        value: "paidAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount -  After",
        value: "balanceAmountAfterPayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Payment Mode",
        value: "paymentMode",
        sortable: false,
        align: "end",
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
        align: "end",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    paymentData: [],
    paymentCompanyHeaders: [
      {
        text: "Payment Number",
        value: "paymentNumber",
        sortable: false,
      },
      {
        text: "Company Name",
        value: "companyDetails.companyName",
        sortable: false,
      },
      {
        text: "Payment Date",
        value: "paymentDate",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount -  Before",
        value: "balanceAmountBeforePayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Paid Amount",
        value: "paidAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount -  After",
        value: "balanceAmountAfterPayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Payment Mode",
        value: "paymentMode",
        sortable: false,
        align: "end",
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
        align: "end",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    paymentCompanyData: [],
  }),
  methods: {
    getAllCustomerPayments() {
      this.$axios
        .get("/payments/customer")
        .then((res) => {
          this.paymentData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllCompanyPayments() {
      this.$axios
        .get("/payments/company")
        .then((res) => {
          this.paymentCompanyData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllPaymentsByCustomer() {
      if (this.customerId) {
        this.$axios
          .get("/payments/customer/" + this.customerId)
          .then((res) => {
            this.paymentData = res.data.reverse();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      } else {
        this.getAllCustomerPayments();
      }
    },
    getAllPaymentsByCompany() {
      if (this.companyId) {
        this.$axios
          .get("/payments/company/" + this.companyId)
          .then((res) => {
            this.paymentCompanyData = res.data.reverse();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      } else {
        this.getAllCompanyPayments();
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
    async printCustomerPayments() {
      var customerPayments = this.$refs.customerPayment.selectedPayments;
      for (var i = 0; i < customerPayments.length; i++) {
        if (customerPayments[i].paymentMode === "Return") {
          var printData = {};
          printData = await this.getReturnDetails(customerPayments[i].returnId);
          var tempItem = Object.assign({}, customerPayments[i]);
          delete tempItem["customerDetails"];
          printData.paymentDetails = tempItem;
          printData.type = "Return";
          print(printData);
        } else {
          customerPayments[i].type = "Payment";
          print(customerPayments[i]);
        }
      }
      this.$refs.customerPayment.selectedPayments = [];
    },
    printCompanyPayments() {
      var companyPayments = this.$refs.companyPayment.selectedPayments;
      for (var i = 0; i < companyPayments.length; i++) {
        companyPayments[i].type = "Payment";
        print(companyPayments[i]);
      }
      this.$refs.companyPayment.selectedPayments = [];
    },
    getReturnDetails(returnId) {
      return this.$axios
        .get("/returns/payment/" + returnId)
        .then((res) => {
          return res.data[0];
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
  watch: {
    customerId: function(val) {
      this.getAllPaymentsByCustomer();
    },
    companyId: function(val) {
      this.getAllPaymentsByCompany();
    },
  },
  mounted() {
    this.getAllCustomerPayments();
    this.getAllCompanyPayments();
    this.getAllCustomers();
    this.getAllCompanies();
  },
};
</script>
