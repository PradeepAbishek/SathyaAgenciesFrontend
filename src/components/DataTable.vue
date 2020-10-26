<template>
  <div class="w-80 mt5">
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-for="(header, index) in headers"
                  :key="index"
                >
                  <v-switch
                    v-if="
                      header.type === 'boolean' && header.text !== 'Actions'
                    "
                    v-model="editedItem[header.value]"
                    :label="header.text"
                    :color="color"
                    hide-details
                  ></v-switch>
                  <v-autocomplete
                    v-else-if="
                      header.type === 'dropDown' && header.text !== 'Actions'
                    "
                    v-model="editedItem[header.value]"
                    :items="header.dropDownItems"
                    :filter="customFilter"
                    :color="color"
                    item-text="name"
                    item-value="id"
                    :label="header.text"
                    required
                    :rules="mandatoryRule"
                  ></v-autocomplete>
                  <v-text-field
                    v-else-if="
                      header.type === 'password' && header.text !== 'Actions'
                    "
                    :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passIcon ? 'text' : 'password'"
                    @click:append="passIcon = !passIcon"
                    v-model="editedItem[header.value]"
                    :label="header.text"
                    required
                    :rules="mandatoryRule"
                    :color="color"
                  ></v-text-field>
                  <v-text-field
                    v-else-if="header.text !== 'Actions'"
                    v-model="editedItem[header.value]"
                    :label="header.text"
                    required
                    :rules="mandatoryRule"
                    :color="color"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="updateItem">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }" v-if="actions">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "DataTable",
  props: ["headers", "items", "actions"],
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    passIcon: false,
    dialog: false,
    editedItem: {},
  }),
  methods: {
    editItem(item) {
      console.log(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {},
    updateItem() {
      console.log(this.editedItem);
    },
    close() {
      this.dialog = false;
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
