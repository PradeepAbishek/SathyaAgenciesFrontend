<template>
  <div class="flex justify-center mt5">
    <v-card elevation="8" class="w-40-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="companyName"
                label="Company Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="address"
                label="Address"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="gstNumber"
                label="GST Number"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="emailAddress"
                label="Mail Address"
                required
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addCompany" dark>
          Add <v-icon class="ml-2"> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "NewCompany",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    companyName: "",
    address: "",
    phoneNumber: "",
    gstNumber: "",
    emailAddress: "",
  }),
  methods: {
    addCompany() {
      var t = this.$refs.form.validate();
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
