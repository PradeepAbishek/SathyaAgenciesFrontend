<template>
  <v-container tag="section" fluid>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
      <v-card dark>
        <bill
          :billItem="editedItem"
          :billItemIndex="editedIndex"
          v-on:hideDialog="hideDialog"
        ></bill>
      </v-card>
    </v-dialog>
    <v-dialog v-model="verificationModal" max-width="1200px" persistent>
      <v-card dark>
        <v-card-title style="padding:24px">
          <div class="ttu flex justify-between">
            <v-chip :color="color" dark class="ttu" small label outlined>
              <span>
                Customer Name - {{ $store.state.billCustomer.customerName }}
              </span>
            </v-chip>
            <v-chip color="warning" dark class="ttu" small label outlined>
              <span>Total Amount - {{ totalBillPrice }}</span>
            </v-chip>
            <v-chip color="red darken-5" dark class="ttu" small label outlined>
              <span>Bill Date - {{ $store.state.billDate }}</span>
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="billItems"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                  color="primary"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
          <v-card class="mt-6">
            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12" sm="12" md="4">
                    <v-radio-group row v-model="paymentMode">
                      <template v-slot:label>
                        <div>Bill Type</div>
                      </template>
                      <v-radio label="Cash" value="Cash"></v-radio>
                      <v-radio label="Credit" value="Credit"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" md="4" sm="12" v-if="paymentMode === 'Cash'">
                    <v-text-field
                      label="Paid Amount"
                      :color="color"
                      :rules="mandatoryRule"
                      v-model="paidBillAmount"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12" v-if="paymentMode === 'Cash'">
                    <v-text-field
                      label="Balance Amount"
                      :color="color"
                      v-model="balanceBillAmount"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions style="padding: 0 24px 24px">
          <v-btn color="indigo" dark @click="closeVerificationModal" text small>
            Add Product <v-icon class="ml-2" small> mdi-plus </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="confirmBill" text small>
            Confirm <v-icon class="ml-2" small> mdi-thumb-up-outline </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <create-bill></create-bill>
    <v-card elevation="8" rounded="3" class="mt-5" dark outlined>
      <v-data-table
        :headers="headers"
        :items="billItems"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-card-actions class="px-3 justify-between">
        <v-chip
          outlined
          small
          label
          :color="color"
          v-if="totalBillPrice > 0"
          dark
        >
          {{ totalBillPrice }}
        </v-chip>
        <v-chip
          outlined
          label
          :color="color"
          class="ttu"
          v-if="totalBillPrice > 0"
          dark
          small
        >
          {{ totalBillPrice | toWords }} rupees only
        </v-chip>
        <v-btn
          :color="color"
          class="ttu"
          @click="verifyBillItems()"
          v-if="totalBillPrice > 0"
          text
          small
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import CreateBill from "@/components/CreateBill";
import Bill from "@/components/Bill";

export default {
  name: "NewBill",
  components: {
    CreateBill,
    Bill,
  },
  data: () => ({
    editedItem: {},
    editedIndex: "",
    dialog: false,
    verificationModal: false,
    paymentMode: "Cash",
    paidBillAmount: "",
    balanceBillAmount: "",
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.billItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.billItems.indexOf(item);
      this.$store.state.billItems.splice(this.editedIndex, 1);
    },
    hideDialog() {
      this.dialog = false;
    },
    verifyBillItems() {
      this.verificationModal = true;
    },
    closeVerificationModal() {
      this.verificationModal = false;
    },
    confirmBill() {
      var billItemCount = this.$store.state.billItems.length;
      var t = this.$refs.form.validate();
      if (t) {
        var billMaster = {};
        billMaster.customerId = this.$store.state.billCustomer._id;
        billMaster.billDate = this.$store.state.billDate;
        billMaster.isIGSTBill = this.$store.state.billItems[0].isIGSTBill;
        billMaster.totalProductCount = billItemCount;
        billMaster.totalGSTAmount = this.totalBillGSTAmount;
        billMaster.totalProductAmount = this.totalBillProductAmount;
        billMaster.totalBillAmount = this.totalBillPrice;
        billMaster.totalProfit = this.totalProfit;
        billMaster.freighCharge = this.$store.state.billFreighCharge;
        billMaster.description = this.$store.state.billDescription;
        billMaster.billDetails = this.$store.state.billItems;
        billMaster.createdBy = this.$store.state.userName;
        if (this.paymentMode === "Cash") {
          billMaster.paymentMode = this.paymentMode;
          billMaster.paidBillAmount = this.paidBillAmount;
          billMaster.balanceBillAmount = this.balanceBillAmount;
        } else {
          billMaster.paymentMode = this.paymentMode;
          billMaster.paidBillAmount = 0;
          billMaster.balanceBillAmount = this.totalBillPrice;
        }
        this.$axios
          .post("/bills/", billMaster)
          .then((res) => {
            this.updateCustomerBills(
              res.data[0].customerId,
              res.data[0]._id,
              res.data[0].balanceBillAmount
            );
            this.$store.commit(
              "successSnackbar",
              "Bill Details Created Successfully"
            );
            this.$router.push("/viewBill");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    updateCustomerBills(customerId, billId, balanceBillAmount) {
      var billData = {};
      billData.billId = billId;
      billData.balanceBillAmount = balanceBillAmount;
      this.$axios
        .put("/customers/updateBills/" + customerId, billData)
        .then((res) => console.log(res))
        .catch((err) =>
          this.$store.commit("errorSnackbar", err.response.data.detail)
        );
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    billItems() {
      return this.$store.state.billItems;
    },
    headers() {
      var billType =
        this.$store.state.billItems.length > 0
          ? this.$store.state.billItems[0].isIGSTBill
          : false;
      if (!billType) {
        return this.$store.state.GSTBillHeaders;
      } else {
        return this.$store.state.IGSTBillHeaders;
      }
    },
    totalBillPrice() {
      var total = 0;
      for (var i = 0; i < this.$store.state.billItems.length; i++) {
        total += this.$store.state.billItems[i].productTotalPrice;
      }
      total += Number(this.$store.state.billFreighCharge);
      return Math.round(total);
    },
    totalBillGSTAmount() {
      var gstAmount = 0;
      for (var i = 0; i < this.$store.state.billItems.length; i++) {
        gstAmount += this.$store.state.billItems[i].gstAmount;
      }
      return gstAmount;
    },
    totalBillProductAmount() {
      var productPrice = 0;
      for (var i = 0; i < this.$store.state.billItems.length; i++) {
        productPrice += this.$store.state.billItems[i].productPrice;
      }
      return productPrice;
    },
    totalProfit() {
      var profit = 0;
      for (var i = 0; i < this.$store.state.billItems.length; i++) {
        profit += this.$store.state.billItems[i].productProfit;
      }
      return Math.round(profit);
    },
  },
  watch: {
    paidBillAmount: function(val) {
      this.balanceBillAmount = this.totalBillPrice - val;
    },
  },
};
</script>
