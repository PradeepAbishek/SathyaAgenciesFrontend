<template>
  <div>
    <div class="flex justify-center mt4">
      <v-card elevation="8" class="w-60-l w-80-m w-80" rounded="3">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
          <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
            <v-icon
              small
              class="mr-2"
              @click="editCompany(item)"
              color="primary"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteCompany(item)" color="error">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <company
      :company="editedCompany"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
    ></company>
  </div>
</template>
<script>
import Company from "@/components/Company";
export default {
  name: "ViewCompany",
  components: {
    Company,
  },
  data: () => ({
    editedCompany: {},
    enableEditing: false,
    desserts: [
      {
        companyName: "Lollipop",
        address: 392,
        phoneNumber: 0.2,
        gstNumber: 98,
        mailAddress: 9,
      },
      {
        companyName: "Lollipop",
        address: 392,
        phoneNumber: 0.2,
        gstNumber: 98,
        mailAddress: 0,
      },
      {
        companyName: "Lollipop",
        address: 392,
        phoneNumber: 0.2,
        gstNumber: 98,
        mailAddress: 0,
      },
      {
        companyName: "Lollipop",
        address: 392,
        phoneNumber: 0.2,
        gstNumber: 98,
        mailAddress: 0,
      },
      {
        companyName: "Lollipop",
        address: 392,
        phoneNumber: 0.2,
        gstNumber: 98,
        mailAddress: 0,
      },
    ],
  }),
  methods: {
    editCompany(item) {
      console.log(item);
      this.editedCompany = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
  },
  computed: {
    headers() {
      return this.$store.state.companyHeaders;
    },
  },
};
</script>
