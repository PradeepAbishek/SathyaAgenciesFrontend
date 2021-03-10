<template>
  <v-dialog v-model="deleteDialog" width="200" persistent>
    <v-card>
      <v-card-text class="pa-6">
        Are you sure want to delete ?
      </v-card-text>
      <v-card-actions class="px-6">
        <v-btn text color="primary" @click="updateDeleteDialog" small>
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="confirmDelete" small>Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "DeleteConfirmation",
  props: {
    id: {
      type: String,
      default: "",
    },
    module: {
      type: String,
      default: "",
    },
    routeName: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  methods: {
    updateDeleteDialog() {
      this.$store.commit("updateDeleteDialog", false);
    },
    confirmDelete() {
      this.$axios
        .delete(this.routeName + "/" + this.id)
        .then((res) => {
          this.updateDeleteDialog();
          this.$store.commit(
            "successSnackbar",
            this.module + " Deleted Successfully"
          );
          this.$emit("refreshData");
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  computed: {
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
};
</script>
