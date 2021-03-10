<template>
  <v-container
    fluid
    tag="section"
    class="flex align-center h-100"
    :style="{
      'background-image':
        'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' +
        require('../assets/img/login.jpg') +
        ')',
      'background-position': 'center top',
      'background-size': 'cover',
    }"
  >
    <v-row class="flex justify-center">
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card class="pa2" outlined>
          <v-sheet :color="color" class="tc ttu" dark>
            <h6 class="pa3">Login</h6>
            <v-progress-linear
              buffer-value="0"
              stream
              color="white"
            ></v-progress-linear>
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
                    :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passIcon ? 'text' : 'password'"
                    @click:append="passIcon = !passIcon"
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
            <div class="flex justify-center">
              <v-btn dark :color="color" class="ttu" @click="login" text>
                Let's Go
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    userName: "",
    password: "",
    passIcon: false,
  }),
  methods: {
    login() {
      var t = this.$refs.form.validate();
      var formData = new FormData();
      formData.append("username", this.userName);
      formData.append("password", this.password);
      if (t) {
        this.$store.dispatch("login", formData);
      }
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
