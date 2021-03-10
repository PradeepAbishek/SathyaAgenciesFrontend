<template>
  <v-container fluid tag="section">
    <v-card elevation="8" rounded="3" outlined dark>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <v-text-field
                v-model="user.userName"
                label="Username"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-text-field
                :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passIcon ? 'text' : 'password'"
                @click:append="passIcon = !passIcon"
                v-model="user.password"
                label="Password"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-switch
                v-model="user.isActive"
                label="Active User"
                color="success"
                hide-details
              ></v-switch>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-switch
                v-model="user.isAdmin"
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
        <v-btn :color="color" @click="addUser" dark text small>
          Add User <v-icon class="ml-2" small> mdi-account-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "NewUser",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    passIcon: false,
    user: {
      userName: "",
      password: "",
      isAdmin: false,
      isActive: true,
    },
  }),
  methods: {
    addUser() {
      var t = this.$refs.form.validate();
      if (t) {
        this.$axios
          .post("/users/", this.user)
          .then((res) => {
            this.$router.push("/viewUser");
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
