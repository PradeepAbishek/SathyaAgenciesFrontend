<template>
  <v-container tag="section" fluid>
    <delete-confirmation
      :id="bankId"
      routeName="banks"
      module="Bank"
      v-if="deleteDialog"
      v-on:refreshData="getAllBanks"
    ></delete-confirmation>
    <v-card elevation="8" rounded="3" dark outlined >
      <v-data-table :headers="headers" :items="bankData" :items-per-page="5">
        <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
          <v-icon small class="mr-2" @click="editBank(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteBank(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <bank
      :bank="editedBank"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
      v-on:refreshBankData="getAllBanks"
    ></bank>
  </v-container>
</template>
<script>
import Bank from "@/components/Bank";
import DeleteConfirmation from "@/components/DeleteConfirmation";
export default {
  name: "ViewBank",
  components: {
    Bank,
    DeleteConfirmation,
  },
  data: () => ({
    enableEditing: false,
    editedUser: {},
    bankData: [],
    bankId: "",
  }),
  computed: {
    headers() {
      return this.$store.state.bankHeaders;
    },
    deleteDialog() {
      return this.$store.state.deleteDialog;
    },
  },
  methods: {
    editBank(item) {
      this.editedBank = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
    getAllBanks() {
      this.$axios
        .get("/banks/")
        .then((res) => {
          this.bankData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    deleteBank(item) {
      this.bankId = item._id;
      this.$store.commit("updateDeleteDialog", true);
    },
  },
  mounted() {
    this.getAllBanks();
  },
};
</script>
