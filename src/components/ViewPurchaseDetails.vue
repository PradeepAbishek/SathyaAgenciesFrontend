<template>
  <v-card dark>
    <v-card-title v-if="viewType === 'Purchase'">
      <div class="ttu flex justify-between">
        <v-chip :color="color" dark class="ttu" small label outlined>
          <span>Company Name - {{ companyName }}</span>
        </v-chip>
        <v-chip color="warning" dark class="ttu" small label outlined>
          <span>Total Amount - {{ totalPurchaseAmount }}</span>
        </v-chip>
        <v-chip color="green" dark class="ttu" small label outlined>
          <span>Bill Date - {{ purchaseDate }}</span>
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
      <v-btn color="primary" dark small text @click="closeModal">
        Close <v-icon class="ml-2" small> mdi-close </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ViewPurchaseDetails",
  props: {
    headers: {
      type: Array,
      default: [],
    },
    item: {
      type: Array,
      default: [],
    },
    companyName: {
      type: String,
      default: "",
    },
    purchaseDate: {
      type: String,
      default: "",
    },
    totalPurchaseAmount: {
      type: Number,
      default: 0,
    },
    viewType: {
      type: String,
      default: "Purchase",
    },
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
