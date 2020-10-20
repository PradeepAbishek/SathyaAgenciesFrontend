<template>
  <div class="flex justify-center mt6">
    <v-card elevation="8" class="w-30" rounded="3">
      <v-sheet :color="color" dark>
        <v-card-title class="tc ttu d-block">
          Change Password
        </v-card-title>
      </v-sheet>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                :append-icon="newIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="newIcon ? 'text' : 'password'"
                @click:append="newIcon = !newIcon"
                v-model="newPassword"
                label="New Password"
                required
                :rules="mandatoryRule"
                prepend-icon="mdi-lock"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                :append-icon="confirmIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="confirmIcon ? 'text' : 'password'"
                @click:append="confirmIcon = !confirmIcon"
                v-model="confirmPassword"
                label="Confirm Password"
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
        <v-btn :color="color" @click="updatePassword" dark>
          Update Password <v-icon class="ml-2"> mdi-update </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "UserProfile",

  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    newIcon: false,
    confirmIcon: false,
    newPassword: "",
    confirmPassword: "",
  }),
  methods: {
    updatePassword() {
      var t = this.$refs.form.validate();
      if(t) {
        if(this.newPassword === this.confirmPassword) {
          alert("Password Same");
        } else {
          alert("Password Mismatch")
        }
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
