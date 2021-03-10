<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="1100px" persistent>
      <view-bill-details
        :headers="billDetailHeaders"
        :item="billDetail"
        viewType="customer"
        v-on:hideDialog="hideDialog"
      ></view-bill-details>
    </v-dialog>
    <v-card-text>
      <v-card class="pa-4 mb-5">
        <div class="flex justify-between">
          <v-chip label outlined color="blue" small class="ttu">
            <span>Customer Name - {{ customerName }}</span>
          </v-chip>
          <v-chip label outlined color="success" small class="ttu">
            <span>Initial Balance Amount - {{ initialBalanceAmount }}</span>
          </v-chip>
          <v-chip label outlined color="error" small class="ttu">
            <span>Current Balance Amount - {{ currentBalanceAmount }}</span>
          </v-chip>
        </div>
      </v-card>
      <div class="mb-2">
        <v-chip label outlined color="success" small class="ttu">Bills</v-chip>
      </div>
      <v-card>
        <v-data-table :headers="billMasterHeaders" :items="billData">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="viewBillDetails(item)"
              color="success"
            >
              mdi-information-outline
            </v-icon>
          </template>
          <template v-slot:[`item.isIGSTBill`]="{ item }">
            <v-chip color="pink" class="ttu" dark small label outlined>
              {{ item.isIGSTBill ? "IGST" : "CGST / SGST" }}
            </v-chip>
          </template>
          <template v-slot:[`item.paymentMode`]="{ item }">
            <v-chip color="cyan" class="ttu" dark small label outlined>
              {{ item.paymentMode }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
      <div class="mb-2 mt-5">
        <v-chip label outlined color="success" small class="ttu">
          Payments
        </v-chip>
      </div>
      <v-card>
        <view-payment-details :headers="paymentHeaders" :item="paymentData">
        </view-payment-details>
      </v-card>
    </v-card-text>
    <v-card-actions class="px-4">
      <v-spacer></v-spacer>
      <v-btn color="primary" dark text small @click="hideBillDialog">
        Close <v-icon class="ml-2" small> mdi-close </v-icon>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
<script>
import ViewBillDetails from "@/components/ViewBillDetails";
import ViewPaymentDetails from "@/components/ViewPaymentDetails";
export default {
  name: "CustomerSummary",
  components: {
    ViewBillDetails,
    ViewPaymentDetails,
  },
  props: [
    "billData",
    "paymentData",
    "initialBalanceAmount",
    "currentBalanceAmount",
    "customerName",
  ],
  data: () => ({
    billMasterHeaders: [
      {
        text: "Bill Date",
        value: "billDate",
        sortable: false,
      },
      {
        text: "Bill Type",
        value: "isIGSTBill",
        sortable: false,
      },
      {
        text: "GST Amount",
        value: "totalGSTAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Product Amount",
        value: "totalProductAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Freigh Charge",
        value: "freighCharge",
        sortable: false,
        align: "end",
      },
      {
        text: "Bill Amount",
        value: "totalBillAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Payment Mode",
        value: "paymentMode",
        sortable: false,
        align: "end",
      },
      {
        text: "Paid Amount",
        value: "paidBillAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount",
        value: "balanceBillAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Description",
        value: "description",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    billDetailGSTHeaders: [
      {
        text: "Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "HSN Code",
        value: "productHSNCode",
        sortable: false,
      },
      {
        text: "Quantity",
        value: "productQuantity",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "productUnitPrice",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "productPrice",
        sortable: false,
      },
      {
        text: "GST %",
        value: "productGST",
        sortable: false,
      },
      {
        text: "GST Amount",
        value: "gstAmount",
        sortable: false,
      },
      {
        text: "CGST Amount",
        value: "cgstAmount",
        sortable: false,
      },
      {
        text: "SGST Amount",
        value: "sgstAmount",
        sortable: false,
      },
      {
        text: "Product Total Price",
        value: "productTotalPrice",
        sortable: false,
      },
    ],
    billDetailIGSTHeaders: [
      {
        text: "Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "HSN Code",
        value: "productHSNCode",
        sortable: false,
      },
      {
        text: "Quantity",
        value: "productQuantity",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "productUnitPrice",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "productPrice",
        sortable: false,
      },
      {
        text: "GST %",
        value: "productGST",
        sortable: false,
      },
      {
        text: "GST Amount",
        value: "gstAmount",
        sortable: false,
      },
      {
        text: "IGST Amount",
        value: "igstAmount",
        sortable: false,
      },
      {
        text: "Product Total Price",
        value: "productTotalPrice",
        sortable: false,
      },
    ],
    dialog: false,
    billDetailHeaders: [],
    billDetail: [],
    billDate: "",
    billAmount: "",
    paymentHeaders: [
      {
        text: "Payment Date",
        value: "paymentDate",
        sortable: false,
      },
      {
        text: "Balance Amount -  Before",
        value: "balanceAmountBeforePayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Paid Amount",
        value: "paidAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount -  After",
        value: "balanceAmountAfterPayment",
        sortable: false,
        align: "end",
      },
      {
        text: "Payment Mode",
        value: "paymentMode",
        sortable: false,
        align: "end",
      },
    ],
  }),
  methods: {
    viewBillDetails(item) {
      this.billDetail = item.billDetails;
      this.billAmount = item.totalBillAmount;
      this.billDate = item.billDate;
      if (item.isIGSTBill) {
        this.billDetailHeaders = this.billDetailIGSTHeaders;
      } else {
        this.billDetailHeaders = this.billDetailGSTHeaders;
      }
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    hideBillDialog() {
      this.$emit("hideCustomerSummaryDialog");
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
