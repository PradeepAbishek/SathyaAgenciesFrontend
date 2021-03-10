<template>
  <v-container tag="section" fluid>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
      <v-card dark>
        <purchase
          :purchaseItem="editedItem"
          :purchaseItemIndex="editedIndex"
          v-on:hideDialog="hideDialog"
        ></purchase>
      </v-card>
    </v-dialog>
    <v-dialog v-model="verificationModal" max-width="1200px" persistent>
      <v-card dark>
        <v-card-title style="padding:24px">
          <div class="ttu flex justify-between">
            <v-chip :color="color" dark class="ttu" small label outlined>
              <span>
                Company Name - {{ $store.state.purchaseCompany.companyName }}
              </span>
            </v-chip>
            <v-chip color="warning" dark class="ttu" small label outlined>
              <span>Total Amount - {{ totalPurchasePrice }}</span>
            </v-chip>
            <v-chip color="green" dark class="ttu" small label outlined>
              <span>Bill Date - {{ $store.state.purchaseDate }}</span>
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="purchaseItems"
            :items-per-page="5"
            class="elevation-1"
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
              <v-icon small @click="deleteItem(item)" color="error">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
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
                      v-model="paidPurchaseAmount"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12" v-if="paymentMode === 'Cash'">
                    <v-text-field
                      label="Balance Amount"
                      :color="color"
                      v-model="balancePurchaseAmount"
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
          <v-btn color="success" dark @click="confirmPurchase" text small>
            Confirm <v-icon class="ml-2" small> mdi-thumb-up-outline </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <create-purchase></create-purchase>
    <v-card elevation="8" rounded="3" class="mt-5" outlined dark>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="purchaseItems"
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
      </v-card-text>
      <v-card-actions class="px-3 justify-between">
        <v-chip outlined label class="ttu" small :color="color" v-if="totalPurchasePrice > 0" dark>
          {{ totalPurchasePrice }}
        </v-chip>
        <v-chip outlined label class="ttu" small :color="color" v-if="totalPurchasePrice > 0" dark>
          {{ totalPurchasePrice | toWords }} rupees only
        </v-chip>
        <v-btn
          :color="color"
          class="ttu"
          @click="verifyPurchaseItems()"
          v-if="totalPurchasePrice > 0"
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
import CreatePurchase from "@/components/CreatePurchase";
import Purchase from "@/components/Purchase";
export default {
  name: "NewPurchase",
  components: {
    CreatePurchase,
    Purchase,
  },
  data: () => ({
    editedItem: {},
    editedIndex: "",
    dialog: false,
    verificationModal: false,
    paymentMode: "Cash",
    paidPurchaseAmount: "",
    balancePurchaseAmount: "",
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.purchaseItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = !this.dialog;
    },
    deleteItem(item) {
      this.editedIndex = this.purchaseItems.indexOf(item);
      this.$store.state.purchaseItems.splice(this.editedIndex, 1);
    },
    confirmPurchase() {
      var purchaseItemCount = this.$store.state.purchaseItems.length;
      var t = this.$refs.form.validate();
      if (t) {
        var purchaseMaster = {};
        purchaseMaster.companyId = this.$store.state.purchaseCompany._id;
        purchaseMaster.purchaseDate = this.$store.state.purchaseDate;
        purchaseMaster.isIGSTBill = this.$store.state.purchaseItems[0].isIGSTBill;
        purchaseMaster.totalProductCount = purchaseItemCount;
        purchaseMaster.totalGSTAmount = this.totalPurchaseGSTAmount;
        purchaseMaster.totalProductAmount = this.totalPurchaseProductAmount;
        purchaseMaster.totalPurchaseAmount = this.totalPurchasePrice;
        purchaseMaster.freighCharge = this.$store.state.purchaseFreighCharge;
        purchaseMaster.description = this.$store.state.purchaseDescription;
        purchaseMaster.purchaseDetails = this.$store.state.purchaseItems;
        purchaseMaster.otherAmount = this.$store.state.purchaseOtherAmount;
        purchaseMaster.createdBy = this.$store.state.userName;
        if (this.paymentMode === "Cash") {
          purchaseMaster.paymentMode = this.paymentMode;
          purchaseMaster.paidPurchaseAmount = this.paidPurchaseAmount;
          purchaseMaster.balancePurchaseAmount = this.balancePurchaseAmount;
        } else {
          purchaseMaster.paymentMode = this.paymentMode;
          purchaseMaster.paidPurchaseAmount = 0;
          purchaseMaster.balancePurchaseAmount = this.totalPurchasePrice;
        }
        this.$axios
          .post("/purchases/", purchaseMaster)
          .then((res) => {
            this.updateCompanyPurchases(
              res.data[0].companyId,
              res.data[0]._id,
              res.data[0].balancePurchaseAmount
            );
            this.$store.commit(
              "successSnackbar",
              "Purchase Details Created Successfully"
            );
            this.$router.push("/viewPurchase");
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      }
    },
    hideDialog() {
      this.dialog = false;
    },
    verifyPurchaseItems() {
      this.paidPurchaseAmount = "";
      this.balancePurchaseAmount = "";
      this.verificationModal = true;
    },
    closeVerificationModal() {
      this.verificationModal = false;
    },
    updateCompanyPurchases(companyId, purchaseId, balancePurchaseAmount) {
      var purchaseData = {};
      purchaseData.purchaseId = purchaseId;
      purchaseData.balancePurchaseAmount = balancePurchaseAmount;
      this.$axios
        .put("/companies/updatePurchases/" + companyId, purchaseData)
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
    purchaseItems() {
      return this.$store.state.purchaseItems;
    },
    headers() {
      var billType =
        this.$store.state.purchaseItems.length > 0
          ? this.$store.state.purchaseItems[0].isIGSTBill
          : false;
      if (!billType) {
        return this.$store.state.GSTPurchaseHeaders;
      } else {
        return this.$store.state.IGSTPurchaseHeaders;
      }
    },
    totalPurchasePrice() {
      var total = 0;
      for (var i = 0; i < this.$store.state.purchaseItems.length; i++) {
        total += this.$store.state.purchaseItems[i].productTotalPrice;
      }
      total += Number(this.$store.state.purchaseOtherAmount);
      return Math.round(total);
    },
    totalPurchaseGSTAmount() {
      var gstAmount = 0;
      for (var i = 0; i < this.$store.state.purchaseItems.length; i++) {
        gstAmount += this.$store.state.purchaseItems[i].gstAmount;
      }
      return gstAmount;
    },
    totalPurchaseProductAmount() {
      var productPrice = 0;
      for (var i = 0; i < this.$store.state.purchaseItems.length; i++) {
        productPrice += this.$store.state.purchaseItems[i].productPrice;
      }
      return productPrice;
    },
  },
  watch: {
    paidPurchaseAmount: function(val) {
      this.balancePurchaseAmount = this.totalPurchasePrice - val;
    },
  },
};
</script>
