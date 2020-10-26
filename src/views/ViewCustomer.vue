<template>
  <div>
    <div class="flex justify-center mt4">
      <v-card elevation="8" class="w-50-l w-50-m w-50" rounded="3">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
          <template v-slot:[`item.actions`]="{ item }" v-if="!enableEditing">
            <v-icon
              small
              class="mr-2"
              @click="editCustomer(item)"
              color="primary"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteCustomer(item)" color="error">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <customer
      :customer="editedCustomer"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
    ></customer>
  </div>
</template>
<script>
import Customer from "@/components/Customer";

export default {
  name: "ViewCustomer",
  components: {
    Customer,
  },
  data: () => ({
    editedCustomer: {},
    enableEditing: false,
    desserts: [
      {
        customerName: "Donut",
        address: 452,
        phoneNumber: 25.0,
        gstNumber: 51,
      },
      {
        customerName: "Donut",
        address: 452,
        phoneNumber: 25.0,
        gstNumber: 51,
      },
    ],
  }),
  methods: {
    editCustomer(item) {
      console.log(item);
      this.editedCustomer = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
  },
  computed: {
    headers() {
      return this.$store.state.customerHeaders;
    },
  },
};
</script>
