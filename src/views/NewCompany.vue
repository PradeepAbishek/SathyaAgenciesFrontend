<template>
  <v-container tag="section" fluid>
    <v-card elevation="8" rounded="3"  outlined dark>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.companyName"
                label="Company Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.phoneNumber"
                label="Phone Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.address"
                label="Address"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.gstNumber"
                label="GST Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.mailAddress"
                label="Mail Address"
                required
                :color="color"
                :rules="mandatoryRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="company.initialBalanceAmount"
                label="Initial Balance Amount"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addCompany" dark text small>
          Add Company <v-icon class="ml-2" small> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewCompany",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    company: {
      companyName: "",
      address: "",
      phoneNumber: "",
      gstNumber: "",
      mailAddress: "",
      initialBalanceAmount: "",
      currentBalanceAmount: "",
      purchases: [],
      payments: [],
    },
  }),
  methods: {
    addCompany() {
      var t = this.$refs.form.validate();
      if (t) {
        this.company.createdBy = this.$store.state.userName;
        this.company.currentBalanceAmount = this.company.initialBalanceAmount;
        this.$axios
          .post("/companies/", this.company)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Company Created Successfully"
            );
            this.$router.push("/viewCompany");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
