<template>
  <v-card dark>
    <v-card-title v-if="viewType === 'Bill'">
      <div class="ttu flex justify-between">
        <v-chip :color="color" dark class="ttu" label small outlined>
          <span>Customer Name - {{ customerName }}</span>
        </v-chip>
        <v-chip color="warning" dark class="ttu" label small outlined>
          <span>Total Amount - {{ totalBillAmount }}</span>
        </v-chip>
        <v-chip color="green" dark class="ttu" label small outlined>
          <span>Bill Date - {{ billDate }}</span>
        </v-chip>
      </div>
    </v-card-title>
    <v-card-text class="pa-4">
      <v-card>
        <v-data-table :headers="headers" :items="item" hide-default-footer>
        </v-data-table>
      </v-card>
    </v-card-text>
    <v-card-actions class="px-4">
      <v-spacer></v-spacer>
      <v-btn color="primary" dark text small @click="closeModal">
        Close <v-icon class="ml-2" small> mdi-close </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ViewBillDetails",
  props: {
    headers: {
      type: Array,
      default: [],
    },
    item: {
      type: Array,
      default: [],
    },
    customerName: {
      type: String,
      default: "",
    },
    billDate: {
      type: String,
      default: "",
    },
    totalBillAmount: {
      type: Number,
      default: 0,
    },
    viewType: {
      type: String,
      default: "Bill"
    }
  },
  data: () => ({}),
  methods: {
    closeModal() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
