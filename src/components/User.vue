<template>
  <v-card elevation="8" class="mt-5" rounded="3" dark>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="12" sm="12" lg="6">
            <v-text-field
              v-model="editedUser.userName"
              label="Username"
              required
              :rules="mandatoryRule"
              :color="color"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12" md="6" sm="6">
              <v-text-field
                :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passIcon ? 'text' : 'password'"
                @click:append="passIcon = !passIcon"
                v-model="editedUser.password"
                label="Password"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col> -->
          <v-col cols="12" md="6" sm="6" lg="3">
            <v-switch
              v-model="editedUser.isActive"
              label="Active User"
              color="success"
              hide-details
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6" sm="6" lg="3">
            <v-switch
              v-model="editedUser.isAdmin"
              label="Admin Access"
              color="success"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" dark @click="hideEditing" text small>
            Close <v-icon class="ml-2" small> mdi-close </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="updateUser" text small>
            Update User <v-icon class="ml-2" small> mdi-update </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "User",
  props: ["user"],
  data: () => ({
    passIcon: false,
    userId: "",
    editedUser: {
      userName: "",
      isAdmin: "",
      isActive: "",
    },
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    async updateUser() {
      var valid = this.$refs.form.validate();
      if (valid) {
        await this.$axios
          .put("/users/" + this.userId, this.editedUser)
          .then((res) => {
            this.$store.commit("successSnackbar", "User Updated Successfully");
            this.$emit("refreshUserData");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
        this.$emit("hideEditing");
      }
    },
  },
  mounted() {
    this.editedUser.userName = this.user.userName;
    this.editedUser.password = this.user.password;
    this.editedUser.isAdmin = this.user.isAdmin;
    this.editedUser.isActive = this.user.isActive;
    this.userId = this.user._id;
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
