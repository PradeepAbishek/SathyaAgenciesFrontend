<template>
  <v-container fluid tag="section">
    <v-dialog v-model="dialog" max-width="1100px" persistent>
      <v-card dark>
        <v-card-title>
          <div class="ttu flex justify-between">
            <v-chip :color="color" dark class="ttu" label small outlined>
              <span>Customer Name - {{ returnCustomerName }}</span>
            </v-chip>
            <v-chip color="warning" dark class="ttu" label small outlined>
              <span>Total Amount - {{ returnAmount }}</span>
            </v-chip>
            <v-chip color="green" dark class="ttu" label small outlined>
              <span>Return Date - {{ returnDate }}</span>
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-card>
            <v-data-table
              :headers="returnDetailGSTHeaders"
              :items="returnDetail"
              hide-default-footer
            >
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
          <v-btn class="ma-2" text icon color="white" @click="printReturns()">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card elevation="8" rounded="3" outlined>
        <v-data-table
          v-model="selectedReturns"
          :headers="returnMasterHeaders"
          :items="returnData"
          :items-per-page="10"
          :search="search"
          show-select
          item-key="returnNumber"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="printReturn(item)"
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
        </v-data-table>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
import print from "../print/index";
export default {
  name: "ViewReturn",
  data: () => ({
    selectedReturns: [],
    customerId: "",
    customerData: [],
    search: "",
    returnMasterHeaders: [
      {
        text: "Return Number",
        value: "returnNumber",
        sortable: false,
      },
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
        text: "Return Date",
        value: "returnDate",
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
        text: "Return Amount",
        value: "totalReturnAmount",
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
    returnData: [],
    returnDetailGSTHeaders: [
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
    dialog: false,
    returnDetail: [],
    returnCustomerName: "",
    returnDate: "",
    returnAmount: "",
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
    getAllReturns() {
      this.$axios
        .get("/returns/")
        .then((res) => {
          this.returnData = res.data.reverse();
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllReturnsByCustomer() {
      if (this.customerId) {
        this.$axios
          .get("/returns/" + this.customerId)
          .then((res) => {
            this.returnData = res.data.reverse();
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      } else {
        this.getAllReturns();
      }
    },
    viewBillDetails(item) {
      this.returnDetail = item.returnDetails;
      this.returnCustomerName = item.customerDetails.customerName;
      this.returnDate = item.returnDate;
      this.returnAmount = item.totalReturnAmount;
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
    },
    printReturn(item) {
      item.type = "Return";
      print(item);
    },
    printReturns() {
      for (var i = 0; i < this.selectedReturns.length; i++) {
        this.selectedReturns[i].type = "Return";
        print(this.selectedReturns[i]);
      }
    },
  },
  watch: {
    customerId: function(val) {
      this.getAllReturnsByCustomer();
    },
  },
  mounted() {
    this.getAllReturns();
    this.getAllCustomers();
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
