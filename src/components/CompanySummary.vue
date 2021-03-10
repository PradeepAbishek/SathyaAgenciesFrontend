<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="1100px" persistent>
      <view-purchase-details
        :headers="purchaseDetailHeaders"
        :item="purchaseDetail"
        viewType="company"
        v-on:hideDialog="hideDialog"
      ></view-purchase-details>
    </v-dialog>
    <v-card-text>
      <v-card class="pa-4 mb-5">
        <div class="flex justify-between">
          <v-chip label outlined color="blue" small class="ttu">
            <span>Company Name - {{ companyName }}</span>
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
        <v-chip label outlined color="success" small class="ttu">
          Purchases
        </v-chip>
      </div>
      <v-card>
        <v-data-table
          :headers="purchaseMasterHeaders"
          :items="purchaseData"
          :items-per-page="10"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="viewPurchaseDetails(item)"
              color="primary"
            >
              mdi-information-outline
            </v-icon>
          </template>
          <template v-slot:[`item.isIGSTBill`]="{ item }">
            <v-chip color="pink" class="ttu" small outlined label dark>
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
      <v-btn color="primary" dark text small @click="hideCompanySummaryDialog">
        Close <v-icon class="ml-2" small> mdi-close </v-icon>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
<script>
import ViewPurchaseDetails from "@/components/ViewPurchaseDetails";
import ViewPaymentDetails from "@/components/ViewPaymentDetails";
export default {
  name: "CustomerSummary",
  components: {
    ViewPaymentDetails,
    ViewPurchaseDetails,
  },
  props: [
    "purchaseData",
    "paymentData",
    "initialBalanceAmount",
    "currentBalanceAmount",
    "companyName",
  ],
  data: () => ({
    purchaseMasterHeaders: [
      {
        text: "Purchase Date",
        value: "purchaseDate",
        sortable: false,
      },
      {
        text: "Bill Type",
        value: "isIGSTBill",
        sortable: false,
      },
      {
        text: "Product Amount",
        value: "totalProductAmount",
        sortable: false,
      },
      {
        text: "GST Amount",
        value: "totalGSTAmount",
        sortable: false,
      },
       {
        text: "Other Amount",
        value: "otherAmount",
        sortable: false,
      },
      {
        text: "Purchase Amount",
        value: "totalPurchaseAmount",
        sortable: false,
      },
      {
        text: "Payment Mode",
        value: "paymentMode",
        sortable: false,
      },
      {
        text: "Paid Amount",
        value: "paidPurchaseAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Balance Amount",
        value: "balancePurchaseAmount",
        sortable: false,
        align: "end",
      },
      {
        text: "Freigh Charge",
        value: "freighCharge",
        sortable: false,
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
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
    purchaseDetailGSTHeaders: [
      {
        text: "Name",
        value: "productName",
        sortable: false,
        align: "center",
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
        value: "unitPrice",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "productPrice",
        sortable: false,
      },
      {
        text: "Selling Price",
        value: "sellingPrice",
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
    purchaseDetailIGSTHeaders: [
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
        value: "unitPrice",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "productPrice",
        sortable: false,
      },
      {
        text: "Selling Price",
        value: "sellingPrice",
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
    purchaseDetailHeaders: [],
    purchaseDetail: [],
    purchaseCompanyName: "",
    purchaseDate: "",
    purchaseAmount: "",
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
    getAllBills() {
      this.$axios
        .get("/bills/")
        .then((res) => {
          this.billData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    viewPurchaseDetails(item) {
      console.log(item);
      this.purchaseDetail = item.purchaseDetails;
      this.purchaseAmount = item.totalPurchaseAmount;
      this.purchaseDate = item.purchaseDate;
      if (item.isIGSTBill) {
        this.purchaseDetailHeaders = this.purchaseDetailIGSTHeaders;
      } else {
        this.purchaseDetailHeaders = this.purchaseDetailGSTHeaders;
      }
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    hideCompanySummaryDialog() {
      this.$emit("hideCompanySummaryDialog");
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
