<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="1200px" persistent>
      <view-purchase-details
        :companyName="purchaseCompanyName"
        :headers="purchaseDetailHeaders"
        :item="purchaseDetail"
        :purchaseDate="purchaseDate"
        :totalPurchaseAmount="purchaseAmount"
        v-on:hideDialog="hideDialog"
      ></view-purchase-details>
    </v-dialog>
    <v-card :color="color" dark class="pa-2">
      <v-row dark>
        <v-col sm="12" md="3" lg="6">
          <v-text-field
            v-model="search"
            label="Search"
            clearable
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>
        <v-col sm="12" md="3" lg="6">
          <v-autocomplete
            v-model="companyId"
            :items="companyData"
            item-text="companyName"
            item-value="_id"
            label="Company Name"
            clearable
            outlined
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-card elevation="8" rounded="3" outlined>
        <v-data-table
          :headers="purchaseMasterHeaders"
          :items="purchaseData"
          :items-per-page="10"
          :search="search"
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
    </v-card>
  </v-container>
</template>
<script>
import ViewPurchaseDetails from "@/components/ViewPurchaseDetails";
export default {
  name: "ViewPurchase",
  components: {
    ViewPurchaseDetails,
  },
  data: () => ({
    search: "",
    companyId: "",
    companyData: [],
    purchaseMasterHeaders: [
      {
        text: "Company Name",
        value: "companyDetails.companyName",
        sortable: false,
      },
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
    purchaseData: [],
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
  }),
  methods: {
    getAllCompanies() {
      this.$axios
        .get("/companies/")
        .then((res) => {
          this.companyData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllPurchases() {
      this.$axios
        .get("/purchases/")
        .then((res) => {
          this.purchaseData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllPurchasesByCompany() {
      if (this.companyId) {
        this.$axios
          .get("/purchases/" + this.companyId)
          .then((res) => {
            this.billData = res.data.reverse();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      } else {
        this.getAllBills();
      }
    },
    viewPurchaseDetails(item) {
      this.purchaseDetail = item.purchaseDetails;
      this.purchaseCompanyName = item.companyDetails.companyName;
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
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  watch: {
    companyId: function(val) {
      this.getAllPurchasesByCompany();
    },
  },
  mounted() {
    this.getAllPurchases();
    this.getAllCompanies();
  },
};
</script>
