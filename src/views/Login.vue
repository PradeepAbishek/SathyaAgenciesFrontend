<template>
  <div class="flex justify-center mt7">
    <v-card elevation="8" class="w-30" rounded="3">
      <v-sheet :color="color" dark>
        <v-card-title class="tc ttu d-block">
          Welcome to {{ companyName }}
        </v-card-title>
      </v-sheet>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="userName"
                label="Username"
                required
                :rules="mandatoryRule"
                prepend-icon="mdi-account"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="password"
                label="Password"
                required
                :rules="mandatoryRule"
                prepend-icon="mdi-lock"
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="login" dark>
          Login <v-icon class="ml-2"> mdi-login </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    userName: "",
    password: "",
  }),
  methods: {
    login() {
      var userConfig = {};
      userConfig.userName = this.userName;
      userConfig.isSuperAdmin = true;
      this.$store.commit("setUserDetails", userConfig)
      this.$router.push('/about');

      // var t = this.$refs.form.validate();
      // console.log(this.userName, this.password);
    },
  },
  computed: {
    companyName() {
      return this.$store.state.companyName;
    },
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
