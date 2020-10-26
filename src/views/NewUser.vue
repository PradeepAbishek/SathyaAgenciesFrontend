<template>
  <div class="flex justify-center mt6">
    <v-card elevation="8" class="w-40-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="userName"
                label="Username"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passIcon ? 'text' : 'password'"
                @click:append="passIcon = !passIcon"
                v-model="password"
                label="Password"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-switch
                v-model="isActive"
                label="Active User"
                color="success"
                hide-details
              ></v-switch>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-switch
                v-model="isAdmin"
                label="Admin Access"
                color="success"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addUser" dark>
          Add <v-icon class="ml-2"> mdi-account-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "NewUser",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    passIcon: false,
    userName: "",
    password: "",
    isAdmin: false,
    isActive: true,
  }),
  methods: {
    addUser() {
      console.log(this.userName, this.password, this.isAdmin, this.isActive);
      // var t = this.$refs.form.validate();
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
