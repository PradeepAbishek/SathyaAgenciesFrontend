<template>
  <v-data-table
    :headers="headers"
    :items="item"
    :items-per-page="5"
    :search="search"
    :show-select="type === 'view'"
    v-model="selectedPayments"
    item-key="paymentNumber"
  >
    <template v-slot:[`item.paymentMode`]="{ item }">
      <v-chip color="cyan" class="ttu" dark small label outlined>
        {{ item.paymentMode }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="printPayment(item)"
        color="blue darken-4"
      >
        mdi-printer
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import print from "../print/index";

export default {
  name: "ViewPaymentDetails",
  props: {
    headers: {
      type: Array,
      default: [],
    },
    item: {
      type: Array,
      default: [],
    },
    search: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    selectedPayments: [],
  }),
  methods: {
    getReturnDetails(returnId) {
      return this.$axios
        .get("/returns/payment/" + returnId)
        .then((res) => {
          return res.data[0];
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    async printPayment(item) {
      if (item.paymentMode === "Return") {
        var printData = {};
        printData = await this.getReturnDetails(item.returnId);
        delete item["customerDetails"];
        printData.paymentDetails = item;
        printData.type = "Return";
        print(printData);
      } else {
        item.type = "Payment";
        print(item);
      }
    },
  },
};
</script>
