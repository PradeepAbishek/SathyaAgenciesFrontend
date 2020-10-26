<template>
  <div>
    <div class="flex justify-center mt4">
      <v-card elevation="8" class="w-50-l w-50-m w-50" rounded="3">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
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
    </div>
    <user
      :user="editedUser"
      v-if="enableEditing"
      v-on:hideEditing="disableEditing"
    ></user>
  </div>
</template>
<script>
import User from "@/components/User";
export default {
  name: "ViewUser",
  components: {
    User,
  },
  data: () => ({
    enableEditing: false,
    editedUser: {},
    desserts: [
      {
        userId: 1,
        userName: "fdfdf",
        password: "23456",
        isAdmin: true,
        isActive: true,
      },
      {
        userId: 2,
        userName: "ddsgg",
        password: "cvbn",
        isAdmin: true,
        isActive: true,
      },
      {
        userId: 3,
        userName: "ksksf",
        password: "3456",
        isAdmin: true,
        isActive: true,
      },
      {
        userId: 4,
        userName: "fdfdf",
        password: "bujm",
        isAdmin: true,
        isActive: true,
      },
    ],
  }),
  computed: {
    headers() {
      return this.$store.state.userHeaders;
    },
  },
  methods: {
    editUser(item) {
      console.log(item);
      this.editedUser = item;
      this.enableEditing = true;
    },
    disableEditing() {
      this.enableEditing = false;
    },
  },
};
</script>
