<template>
  <div class="flex justify-center mt4 mb4">
    <v-card elevation="8" class="w-50-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="customerName"
                label="Customer Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="address"
                label="Address"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="gstNumber"
                label="GST Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn color="primary" dark block @click="hideEditing">
                Close <v-icon class="ml-2"> mdi-close </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn :color="color" dark @click="updateCustomer" block>
                Update Customer <v-icon class="ml-2"> mdi-update </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Customer",
  props: ["customer"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    customerName: "",
    address: "",
    phoneNumber: "",
    gstNumber: "",
    customerId: "",
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    updateCustomer() {
      var valid = this.$refs.form.validate();
      if (valid) {
        console.log("Need to set update api to user");
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
    this.customerName = this.customer.customerName;
    this.address = this.customer.address;
    this.phoneNumber = this.customer.phoneNumber;
    this.gstNumber = this.customer.gstNumber;
  },
};
</script>
