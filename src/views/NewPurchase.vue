<template>
  <div>
    <create-purchase></create-purchase>
    <div class="flex justify-center mt3">
      <v-card elevation="8" class="w-90-l w-90-m w-90" rounded="3">
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="purchaseItems"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-dialog v-model="dialog" max-width="500px" persistent>
                <purchase
                  :purchaseItem="editedItem"
                  :purchaseItemIndex="editedIndex"
                ></purchase>
              </v-dialog>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)" color="primary">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)" color="error">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined color="indigo" v-if="totalAmount > 0">
            {{ Math.round(totalAmount) | toWords }} rupees only
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="insertPurchase()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import CreatePurchase from "@/components/CreatePurchase";
import Purchase from "@/components/Purchase";
export default {
  name: "NewPurchase",
  components: {
    CreatePurchase,
    Purchase,
  },
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    editedItem: {},
    editedIndex: "",
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.purchaseItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.commit("updatePurchaseModalState", true);
    },
    deleteItem(item) {
      this.editedIndex = this.purchaseItems.indexOf(item);
      this.$store.state.purchaseItems.splice(this.editedIndex, 1);
    },
    insertPurchase() {
      this.$store.commit("resetPurchaseItem", []);
      this.$store.commit("resetPurchaseDate");
      this.$store.commit("resetPurchaseCompany");
      this.$refs.form1.reset();
      console.log(
        "Need to reset the purchase items, purchase company, purchase date"
      );
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    purchaseItems() {
      return this.$store.state.purchaseItems;
    },
    headers() {
      return this.$store.state.purchaseHeaders;
    },
    dialog() {
      return this.$store.state.purchaseModal;
    },
    totalAmount() {
      var total = 0;
      for (var i = 0; i < this.$store.state.purchaseItems.length; i++) {
        total += this.$store.state.purchaseItems[i].productPrice;
      }
      return total;
    },
  },
};
</script>
