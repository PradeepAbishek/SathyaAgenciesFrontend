<template>
  <v-container fluid tag="section">
    <delete-confirmation
      :id="userId"
      routeName="users"
      module="User"
      v-if="deleteDialog"
      v-on:refreshData="getAllUsers"
    ></delete-confirmation>
    <v-card elevation="8" rounded="3" outlined dark>
      <v-data-table :headers="headers" :items="userData" :items-per-page="5">
        <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
          <v-icon small class="mr-2" @click="editUser(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <user
      :user="editedUser"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
      v-on:refreshUserData="getAllUsers"
    ></user>
  </v-container>
</template>
<script>
import User from "@/components/User";
import DeleteConfirmation from "@/components/DeleteConfirmation";
export default {
  name: "ViewUser",
  components: {
    User,
    DeleteConfirmation,
  },
  data: () => ({
    enableEditing: false,
    editedUser: {},
    userData: [],
    userId: "",
  }),
  computed: {
    headers() {
      return this.$store.state.userHeaders;
    },
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  methods: {
    editUser(item) {
      this.editedUser = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
    getAllUsers() {
      this.$axios
        .get("/users/")
        .then((res) => {
          this.userData = res.data.filter(
            (user) =>
              user.userName !== this.$cookies.get("sathyaAgencies").userName
          );
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    deleteItem(item) {
      this.userId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
