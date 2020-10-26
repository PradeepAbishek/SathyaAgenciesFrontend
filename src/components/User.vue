<template>
  <div class="flex justify-center mt4 mb4">
    <v-card elevation="8" class="w-50-l w-50-m w-50" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="userName"
                label="Username"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
              <v-btn color="primary" dark block @click="hideEditing">
                Close <v-icon class="ml-2"> mdi-close </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-btn :color="color" dark @click="updateUser" block>
                Update User <v-icon class="ml-2"> mdi-update </v-icon>
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
  name: "User",
  props: ["user"],
  data: () => ({
    passIcon: false,
    userId: "",
    userName: "",
    password: "",
    isAdmin: "",
    isActive: "",
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
  }),
  methods: {
    hideEditing() {
      this.$emit("hideEditing");
    },
    updateUser() {
      var valid = this.$refs.form.validate();
      if(valid) {
        console.log("Need to set update api to user");
        this.$emit("hideEditing");
      }
    },
  },
  mounted() {
    this.userName = this.user.userName;
    this.password = this.user.password;
    this.isAdmin = this.user.isAdmin;
    this.isActive = this.user.isActive;
    this.userId = this.user.userId;
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
