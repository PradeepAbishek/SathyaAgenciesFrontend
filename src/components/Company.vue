<template>
  <v-card elevation="8" rounded="3" class="mt-5" dark>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.companyName"
              label="Company Name"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.phoneNumber"
              label="Phone Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.address"
              label="Address"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.gstNumber"
              label="GST Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.mailAddress"
              label="Mail Address"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCompany.initialBalanceAmount"
              label="Initial Balance Amount"
              :color="color"
              type="number"
              min="0"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="hideEditing" text small>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateCompany" text small>
            Update Company <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Company",
  props: ["company"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    editedCompany: {
      companyName: "",
      address: "",
      phoneNumber: "",
      gstNumber: "",
      mailAddress: "",
    },
    companyId: "",
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    async updateCompany() {
      var valid = this.$refs.form.validate();
      if (valid) {
        await this.$axios
          .put("/companies/" + this.companyId, this.editedCompany)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Company Details Updated Successfully"
            );
            this.$emit("refreshCompanyData");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
        this.$emit("hideEditing");
      }
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.editedCompany.companyName = this.company.companyName;
    this.editedCompany.address = this.company.address;
    this.editedCompany.phoneNumber = this.company.phoneNumber;
    this.editedCompany.gstNumber = this.company.gstNumber;
    this.editedCompany.mailAddress = this.company.mailAddress;
    this.editedCompany.initialBalanceAmount = this.company.initialBalanceAmount;
    this.companyId = this.company._id;
  },
};
</script>
