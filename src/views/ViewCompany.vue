<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="companyId"
      routeName="companies"
      module="Company"
      v-if="deleteDialog"
      v-on:refreshData="getAllCompanies"
    ></delete-confirmation>
    <v-dialog v-model="companySummaryDialog" max-width="1300px" persistent>
      <v-card dark>
        <company-summary
          :purchaseData="purchaseData"
          :paymentData="paymentData"
          :initialBalanceAmount="initialBalanceAmount"
          :currentBalanceAmount="currentBalanceAmount"
          :companyName="companyName"
          v-on:hideCompanySummaryDialog="hideCompanySummaryDialog"
        ></company-summary>
      </v-card>
    </v-dialog>
    <v-card elevation="8" rounded="3" outlined dark>
      <v-data-table :headers="headers" :items="companyData" :items-per-page="5">
        <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
          <v-icon
            small
            class="mr-2"
            @click="viewCompanySummary(item)"
            color="cyan"
          >
            mdi-information-outline
          </v-icon>
          <v-icon small class="mr-2" @click="editCompany(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteCompany(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <company
      :company="editedCompany"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
      v-on:refreshCompanyData="getAllCompanies"
    ></company>
  </v-container>
</template>
<script>
import Company from "@/components/Company";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import CompanySummary from "@/components/CompanySummary";
export default {
  name: "ViewCompany",
  components: {
    Company,
    DeleteConfirmation,
    CompanySummary,
  },
  data: () => ({
    editedCompany: {},
    enableEditing: false,
    companyData: [],
    companyId: "",
    companySummaryDialog: false,
    purchaseData: [],
    paymentData: [],
    currentBalanceAmount: "",
    initialBalanceAmount: "",
    companyName: "",
  }),
  methods: {
    editCompany(item) {
      this.editedCompany = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
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
    deleteCompany(item) {
      this.companyId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
    viewCompanySummary(item) {
      console.log(item);
      this.purchaseData = item.purchases;
      this.paymentData = item.payments;
      this.companyName = item.companyName;
      this.initialBalanceAmount = item.initialBalanceAmount;
      this.currentBalanceAmount = item.currentBalanceAmount;
      this.companySummaryDialog = true;
    },
    hideCompanySummaryDialog() {
      this.companySummaryDialog = false;
    },
  },
  computed: {
    headers() {
      return this.$store.state.companyHeaders;
    },
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  mounted() {
    this.getAllCompanies();
  },
};
</script>
