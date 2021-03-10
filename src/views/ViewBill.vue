<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="1100px" persistent>
      <view-bill-details
        :customerName="billCompanyName"
        :headers="billDetailHeaders"
        :item="billDetail"
        :billDate="billDate"
        :totalBillAmount="billAmount"
        v-on:hideDialog="hideDialog"
      ></view-bill-details>
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
        <v-col sm="12" md="3" lg="5">
          <v-autocomplete
            v-model="customerId"
            :items="customerData"
            item-text="customerName"
            item-value="_id"
            label="Customer Name"
            clearable
            outlined
          ></v-autocomplete>
        </v-col>
        <v-col sm="12" md="3" lg="1">
          <v-btn class="ma-2" text icon color="white" @click="printBills()">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card elevation="8" rounded="3" outlined>
        <v-data-table
          v-model="selectedBills"
          :headers="billMasterHeaders"
          :items="billData"
          :items-per-page="10"
          :search="search"
          show-select
          item-key="billNumber"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="printBill(item)"
              color="blue darken-4"
            >
              mdi-printer
            </v-icon>
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
    </v-card>
  </v-container>
</template>
<script>
import print from "../print/index";
import ViewBillDetails from "@/components/ViewBillDetails";
export default {
  name: "ViewBill",
  components: {
    ViewBillDetails,
  },
  data: () => ({
    selectedBills: [],
    customerId: "",
    customerData: [],
    search: "",
    billMasterHeaders: [
      {
        text: "Bill Number",
        value: "billNumber",
        sortable: false,
      },
      {
        text: "Customer Name",
        value: "customerDetails.customerName",
        sortable: false,
      },
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
        text: "Created By",
        value: "createdBy",
        sortable: false,
        align: "end",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    billData: [],
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
    billCompanyName: "",
    billDate: "",
    billAmount: "",
  }),
  methods: {
    getAllCustomers() {
      this.$axios
        .get("/customers/")
        .then((res) => {
          this.customerData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
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
    getAllBillsByCustomer() {
      if (this.customerId) {
        this.$axios
          .get("/bills/" + this.customerId)
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
    viewBillDetails(item) {
      this.billDetail = item.billDetails;
      this.billCompanyName = item.customerDetails.customerName;
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
    printBill(item) {
      item.type = "Bill";
      print(item);
    },
    printBills() {
      for (var i = 0; i < this.selectedBills.length; i++) {
        this.selectedBills[i].type = "Bill";
        print(this.selectedBills[i]);
      }
      this.selectedBills = [];
    },
  },
  watch: {
    customerId: function(val) {
      this.getAllBillsByCustomer();
    },
  },
  mounted() {
    this.getAllBills();
    this.getAllCustomers();
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
