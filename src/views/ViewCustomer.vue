<template>
  <v-container tag="section" fluid>
    <delete-confirmation
      :id="customerId"
      routeName="customers"
      module="Customer"
      v-if="deleteDialog"
      v-on:refreshData="getAllCustomers"
    ></delete-confirmation>
    <v-dialog v-model="customerSummaryDialog" max-width="1300px" persistent>
      <v-card dark>
        <customer-summary
          :billData="billData"
          :paymentData="paymentData"
          :initialBalanceAmount="initialBalanceAmount"
          :currentBalanceAmount="currentBalanceAmount"
          :customerName="customerName"
          v-on:hideCustomerSummaryDialog="hideCustomerSummaryDialog"
        ></customer-summary>
      </v-card>
    </v-dialog>
    <v-card elevation="8" rounded="3" dark outlined>
      <v-data-table
        :headers="headers"
        :items="customerData"
        :items-per-page="5"
      >
        <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
          <v-icon
            small
            class="mr-2"
            @click="viewCustomerBills(item)"
            color="cyan"
          >
            mdi-information-outline
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editCustomer(item)"
            color="primary"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteCustomer(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.isDealer`]="{ item }">
          <v-chip color="success" dark label outlined small>
            {{ item.isDealer ? "Dealer" : "Farmer" }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <customer
      :customer="editedCustomer"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
      v-on:refreshCustomerData="getAllCustomers"
    ></customer>
  </v-container>
</template>
<script>
import Customer from "@/components/Customer";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import CustomerSummary from "@/components/CustomerSummary";

export default {
  name: "ViewCustomer",
  components: {
    Customer,
    DeleteConfirmation,
    CustomerSummary,
  },
  data: () => ({
    customerSummaryDialog: false,
    editedCustomer: {},
    enableEditing: false,
    customerData: [],
    customerId: "",
    billData: [],
    paymentData: [],
    currentBalanceAmount: "",
    initialBalanceAmount: "",
    customerName: "",
  }),
  methods: {
    editCustomer(item) {
      this.editedCustomer = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
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
    deleteCustomer(item) {
      this.customerId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
    viewCustomerBills(item) {
      this.billData = item.bills.reverse();
      this.paymentData = item.payments.reverse();
      this.customerName = item.customerName;
      this.initialBalanceAmount = item.initialBalanceAmount;
      this.currentBalanceAmount = item.currentBalanceAmount;
      this.customerSummaryDialog = true;
    },
    hideCustomerSummaryDialog() {
      this.customerSummaryDialog = false;
    },
  },
  computed: {
    headers() {
      return this.$store.state.customerHeaders;
    },
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  mounted() {
    this.getAllCustomers();
  },
};
</script>
