<template>
  <v-card elevation="8" class="mt-5" rounded="3" dark>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
              v-model="editedBank.companyId"
              :items="companyData"
              :filter="customFilter"
              :color="color"
              item-text="companyName"
              item-value="_id"
              label="Company Name"
              required
              :rules="mandatoryRule"
              disabled
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedBank.bankName"
              label="Bank Name"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="6">
            <v-text-field
              v-model="editedBank.accountNumber"
              label="Account Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedBank.ifscCode"
              label="IFSC Code"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedBank.branchName"
              label="Branch Name"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="hideEditing" text small>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateBank" text small>
            Update Bank <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Bank",
  props: ["bank"],
  data: () => ({
    editedBank: {
      companyId: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
    },
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    companyData: [],
    bankId: "",
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyNamr.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    hideEditing() {
      this.$emit("hideEditing");
    },
    async updateBank() {
      var valid = this.$refs.form.validate();
      if (valid) {
        await this.$axios
          .put("/banks/" + this.bankId, this.editedBank)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Bank Details Updated Successfully"
            );
            this.$emit("refreshBankData");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
        this.$emit("hideEditing");
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
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.getAllCompanies();
    this.editedBank.companyId = this.bank.companyId;
    this.editedBank.bankName = this.bank.bankName;
    this.editedBank.accountNumber = this.bank.accountNumber;
    this.editedBank.ifscCode = this.bank.ifscCode;
    this.editedBank.branchName = this.bank.branchName;
    this.bankId = this.bank._id;
  },
};
</script>
