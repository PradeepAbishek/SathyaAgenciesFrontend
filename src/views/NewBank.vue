<template>
  <v-container fluid tag="section">
    <v-card elevation="8" rounded="3" dark outlined>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-autocomplete
                v-model="bank.companyId"
                :items="companyData"
                :filter="customFilter"
                :color="color"
                item-text="companyName"
                item-value="_id"
                label="Company Name"
                required
                :rules="mandatoryRule"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="bank.bankName"
                label="Bank Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="bank.accountNumber"
                label="Account Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="bank.ifscCode"
                label="IFSC Code"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="bank.branchName"
                label="Branch Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addBank" dark text small>
          Add Bank <v-icon class="ml-2" small> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewBank",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    bank: {
      companyId: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
    },
    companyData: [],
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.companyName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    addBank() {
      var t = this.$refs.form.validate();
      if (t) {
        this.bank.createdBy = this.$store.state.userName;
        this.$axios
          .post("/banks/", this.bank)
          .then((res) => {
            this.$router.push("/viewBank");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
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
  },
};
</script>
