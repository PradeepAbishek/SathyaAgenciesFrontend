<template>
  <v-container tag="section" fluid>
    <v-dialog v-model="verificationDialog" width="200" persistent>
      <v-card>
        <v-card-text class="pa-6">
          Are you sure want to confirm the Payment?
        </v-card-text>
        <v-card-actions class="px-6">
          <v-btn text color="primary" @click="closeVerificationDialog" small>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="confirmPayment" small>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card elevation="8" rounded="3"  outlined dark>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="4">
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
                  v-model="payment.paymentDate"
                  label="Payment Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  required
                  :rules="mandatoryRule"
                  :color="color"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="payment.paymentDate"
                @input="date = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="paymentType"
              :items="paymentTypes"
              :color="color"
              label="Payment Type"
              :rules="mandatoryRule"
            ></v-select>
          </v-col>
        </v-row>
        <v-form ref="form" v-if="paymentType === 'Customer'">
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-autocomplete
                v-model="customer"
                :filter="customFilter"
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
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.address"
                label="Address"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.phoneNumber"
                label="Phone Number"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.gstNumber"
                label="GST Number"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.aadharNumber"
                label="Aadhar Number"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.currentBalanceAmount"
                label="Balance Amount"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="payment.paidAmount"
                label="Payment Amount"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="currentBalanceAmount"
                label="Current Balance Amount"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="payment.paymentMode"
                label="Payment Mode"
                required
                :color="color"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="payment.reference"
                label="Reference"
                required
                :color="color"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn :color="color" dark text small @click="verifyPayment">
              Submit
            </v-btn>
          </v-row>
        </v-form>
        <v-form ref="form1" v-else>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-autocomplete
                v-model="company"
                :filter="customFilter1"
                :items="companyData"
                :color="color"
                item-text="companyName"
                item-value="companyId"
                label="Company Name"
                required
                :rules="mandatoryRule"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="company.address"
                label="Address"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="company.phoneNumber"
                label="Phone Number"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="company.gstNumber"
                label="GST Number"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="company.mailAddress"
                label="Mail Address"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="company.currentBalanceAmount"
                label="Balance Amount"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="paymentCompany.paidAmount"
                label="Payment Amount"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="currentBalanceAmount"
                label="Current Balance Amount"
                required
                :color="color"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="paymentCompany.paymentMode"
                label="Payment Mode"
                required
                :color="color"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="paymentCompany.reference"
                label="Reference"
                required
                :color="color"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn :color="color" dark text small @click="verifyPayment">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewPayment",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    date: false,
    customer: "",
    company: "",
    payment: {
      paymentDate: new Date().toISOString().substr(0, 10),
      paidAmount: "",
      paymentMode: "Cash",
      reference: "",
    },
    paymentCompany: {
      paymentDate: new Date().toISOString().substr(0, 10),
      paidAmount: "",
      paymentMode: "Cheque",
      reference: "",
    },
    customerData: [],
    companyData: [],
    verificationDialog: false,
    paymentTypes: ["Customer", "Company"],
    paymentType: "Customer",
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.customerName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    customFilter1(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
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
    confirmPayment() {
      if (this.paymentType === "Customer") {
        this.payment.createdBy = this.$store.state.userName;
        this.payment.balanceAmountAfterPayment = this.currentBalanceAmount;
        this.payment.balanceAmountBeforePayment = this.customer.currentBalanceAmount;
        this.customerPayment();
      } else {
        this.paymentCompany.createdBy = this.$store.state.userName;
        this.paymentCompany.balanceAmountAfterPayment = this.currentBalanceAmount;
        this.paymentCompany.balanceAmountBeforePayment = this.company.currentBalanceAmount;
        this.companyPayment();
      }
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
    updateCompanyPayments(companyId, paymentId, paidAmount) {
      var paymentData = {};
      paymentData.paymentId = paymentId;
      paymentData.paidAmount = paidAmount;
      this.$axios
        .put("/companies/updatePayments/" + companyId, paymentData)
        .then((res) => console.log(res))
        .catch((err) =>
          this.$store.commit("errorSnackbar", err.response.data.detail)
        );
    },
    verifyPayment() {
      if (this.paymentType === "Customer") {
        var t = this.$refs.form.validate();
        if (t) {
          this.verificationDialog = true;
        }
      } else {
        var t1 = this.$refs.form1.validate();
        if (t1) {
          this.verificationDialog = true;
        }
      }
    },
    closeVerificationDialog() {
      this.verificationDialog = false;
    },
    customerPayment() {
      this.$axios
        .post("/payments/customer", this.payment)
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
    companyPayment() {
      console.log(this.paymentCompany);
      this.$axios
        .post("/payments/company", this.paymentCompany)
        .then((res) => {
          this.updateCompanyPayments(
            res.data[0].companyId,
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
  },
  watch: {
    customer: function(val) {
      if (val) {
        this.payment.customerId = val._id;
      }
    },
    company: function(val) {
      if (val) {
        this.paymentCompany.companyId = val._id;
      }
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    currentBalanceAmount() {
      if (this.paymentType === "Customer") {
        return this.customer.currentBalanceAmount - this.payment.paidAmount;
      } else {
        return (
          this.company.currentBalanceAmount - this.paymentCompany.paidAmount
        );
      }
    },
  },
  mounted() {
    this.getAllCustomers();
    this.getAllCompanies();
  },
};
</script>
