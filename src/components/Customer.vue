<template>
  <v-card elevation="8" rounded="3" class="mt-5" dark>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCustomer.customerName"
              label="Customer Name"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCustomer.address"
              label="Address"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCustomer.phoneNumber"
              label="Phone Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="editedCustomer.gstNumber"
              label="GST Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="editedCustomer.initialBalanceAmount"
              label="Initial Balance Amount"
              required
              :color="color"
              type="number"
              min="0"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              v-model="editedCustomer.aadharNumber"
              label="Aadhar Number"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="2">
            <v-switch
              v-model="editedCustomer.isDealer"
              inset
              label="Is Dealer ?"
              :color="color"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="hideEditing" text small>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateCustomer" text small>
            Update Customer <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Customer",
  props: ["customer"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    editedCustomer: {},
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    async updateCustomer() {
      var valid = this.$refs.form.validate();
      if (valid) {
        await this.$axios
          .put("/customers/" + this.editedCustomer._id, this.editedCustomer)
          .then((res) => {
            this.$store.commit(
              "successSnackbar",
              "Customer Details Updated Successfully"
            );
            this.$emit("refreshCustomerData");
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
    this.editedCustomer = Object.assign({}, this.customer);
  },
};
</script>
