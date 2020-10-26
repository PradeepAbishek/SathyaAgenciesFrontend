<template>
  <div>
    <div class="flex justify-center mt4">
      <v-card elevation="8" class="w-60-l w-80-m w-80" rounded="3">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
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
    </div>
    <bank
      :bank="editedBank"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
    ></bank>
  </div>
</template>
<script>
import Bank from "@/components/Bank";
export default {
  name: "ViewBank",
  components: {
    Bank,
  },
  data: () => ({
    enableEditing: false,
    editedUser: {},
    desserts: [
      {
        companyName: "Test",
        companyId: 1,
        bankName: "wef",
        accNumber: 12345,
        ifscCode: 1234567,
        branchName: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        bankName: "wef",
        accNumber: 12345,
        ifscCode: 1234567,
        branchName: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        bankName: "wef",
        accNumber: 12345,
        ifscCode: 1234567,
        branchName: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        bankName: "wef",
        accNumber: 12345,
        ifscCode: 1234567,
        branchName: "sdf",
      },
      {
        companyName: "Test",
        companyId: 1,
        bankName: "wef",
        accNumber: 12345,
        ifscCode: 1234567,
        branchName: "sdf",
      },
    ],
  }),
  computed: {
    headers() {
      return this.$store.state.bankHeaders;
    },
  },
  methods: {
    editBank(item) {
      console.log(item);
      this.editedBank = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
  },
};
</script>
