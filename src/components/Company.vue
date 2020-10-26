<template>
  <div class="flex justify-center mt4 mb4">
    <v-card elevation="8" class="w-60-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="companyName"
                label="Company Name"
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
              <v-text-field
                v-model="mailAddress"
                label="Mail Address"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6"></v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn color="primary" dark block @click="hideEditing">
                Close <v-icon class="ml-2"> mdi-close </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn :color="color" dark @click="updateCompany" block>
                Update Company <v-icon class="ml-2"> mdi-update </v-icon>
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
  name: "Company",
  props: ["company"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    companyName: "",
    address: "",
    phoneNumber: "",
    gstNumber: "",
    companyId: "",
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    updateCompany() {
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
    this.companyName = this.company.companyName;
    this.address = this.company.address;
    this.phoneNumber = this.company.phoneNumber;
    this.gstNumber = this.company.gstNumber;
    this.mailAddress = this.company.mailAddress;
  },
};
</script>
