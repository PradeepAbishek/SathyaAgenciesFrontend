<template>
  <v-container fluid tag="section">
    <v-card elevation="8" rounded="3"  outlined dark>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.customerName"
                label="Customer Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.address"
                label="Address"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.phoneNumber"
                label="Phone Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.gstNumber"
                label="GST Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.initialBalanceAmount"
                label="Initial Balance Amount"
                required
                :rules="mandatoryRule"
                :color="color"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="customer.aadharNumber"
                label="Aadhar Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" sm="2">
              <v-switch
                v-model="customer.isDealer"
                inset
                label="Is Dealer ?"
                :color="color"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addCustomer" dark text small>
          Add Customer <v-icon class="ml-2"> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewCustomer",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    customer: {
      customerName: "",
      address: "",
      phoneNumber: "",
      gstNumber: "",
      initialBalanceAmount: "",
      currentBalanceAmount: "",
      bills: [],
      payments: [],
      isDealer: false,
      aadharNumber: "",
    },
  }),
  methods: {
    addCustomer() {
      var t = this.$refs.form.validate();
      if (t) {
        this.customer.createdBy = this.$store.state.userName;
        this.customer.currentBalanceAmount = this.customer.initialBalanceAmount;
        this.$axios
          .post("/customers/", this.customer)
          .then((res) => {
            this.$router.push("/viewCustomer");
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
