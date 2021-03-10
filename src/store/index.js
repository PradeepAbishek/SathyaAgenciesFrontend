import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminUser: false,
    companyName: "Sathya Agencies",
    color: "green",
    userLogged: false,
    userName: "",
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    snackbarTimeout: "5000",
    menuLists: [
      {
        action: "mdi-receipt",
        items: [
          { title: "New Bill", path: "/newBill" },
          { title: "View Bills", path: "/viewBill" },
        ],
        title: "Bill",
      },
      {
        action: "mdi-shopping",
        items: [
          { title: "New Purchase", path: "/newPurchase" },
          { title: "View Purchases", path: "/viewPurchase" },
        ],
        title: "Purchase",
      },
      {
        action: "mdi-corn",
        items: [
          { title: "New Product", path: "/newProduct" },
          { title: "View Products", path: "/viewProduct" },
        ],
        title: "Product",
      },
      {
        action: "mdi-city",
        items: [
          { title: "New Company", path: "/newCompany" },
          { title: "View Companies", path: "/viewCompany" },
        ],
        title: "Company",
      },
      {
        action: "mdi-account-outline",
        items: [
          { title: "New Customer", path: "/newCustomer" },
          { title: "View Customers", path: "/viewCustomer" },
        ],
        title: "Customer",
      },
      {
        action: "mdi-bank",
        items: [
          { title: "New Bank", path: "/newBank" },
          { title: "View Banks", path: "/viewBank" },
        ],
        title: "Bank",
      },
      {
        action: "mdi-baby",
        items: [
          { title: "New User", path: "/newUser" },
          { title: "View Users", path: "/viewUser" },
        ],
        title: "Users",
      },
      {
        action: "mdi-currency-inr",
        items: [
          { title: "New Payment", path: "/newPayment" },
          { title: "View Payments", path: "/viewPayment" },
        ],
        title: "Payments",
      },
      {
        action: "mdi-keyboard-return",
        items: [
          { title: "New Return", path: "/newReturn" },
          { title: "View Returns", path: "/viewReturn" },
        ],
        title: "Returns",
      },
    ],
    purchaseItems: [],
    purchaseCompany: {},
    purchaseDate: "",
    purchaseFreighCharge: 0,
    purchaseDescription: "",
    purchaseOtherAmount: 0,
    IGSTPurchaseHeaders: [
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "unitPrice",
        sortable: false,
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
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
        text: "HSN Code",
        value: "productHSNCode",
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
      {
        text: "Selling Price",
        value: "sellingPrice",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    GSTPurchaseHeaders: [
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "unitPrice",
        sortable: false,
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
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
        text: "HSN Code",
        value: "productHSNCode",
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
      {
        text: "Selling Price",
        value: "sellingPrice",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    userHeaders: [
      {
        text: "User Name",
        value: "userName",
        sortable: false,
      },
      {
        text: "Active User",
        value: "isActive",
        sortable: false,
      },
      {
        text: "Admin Access",
        value: "isAdmin",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    bankHeaders: [
      {
        text: "Company Name",
        value: "companyDetails.companyName",
        sortable: false,
      },
      {
        text: "Bank Name",
        value: "bankName",
        sortable: false,
      },
      {
        text: "Account Number",
        value: "accountNumber",
        sortable: false,
      },
      {
        text: "IFSC Code",
        value: "ifscCode",
        sortable: false,
      },
      {
        text: "Branch Name",
        value: "branchName",
        sortable: false,
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    customerHeaders: [
      {
        text: "Customer Name",
        value: "customerName",
        sortable: false,
      },
      {
        text: "Address",
        value: "address",
        sortable: false,
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
        sortable: false,
      },
      {
        text: "GST Number",
        value: "gstNumber",
        sortable: false,
      },
      {
        text: "Aadhar Number",
        value: "aadharNumber",
        sortable: false,
      },
      {
        text: "Initial Balance Amount",
        value: "initialBalanceAmount",
        sortable: false,
      },
      {
        text: "Current Balance Amount",
        value: "currentBalanceAmount",
        sortable: false,
      },
      {
        text: "Customer Type",
        value: "isDealer",
        sortable: false,
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    companyHeaders: [
      {
        text: "Company Name",
        value: "companyName",
        sortable: false,
      },
      {
        text: "Address",
        value: "address",
        sortable: false,
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
        sortable: false,
      },
      {
        text: "GST Number",
        value: "gstNumber",
        sortable: false,
      },
      {
        text: "Mail Address",
        value: "mailAddress",
        sortable: false,
      },
      {
        text: "Initial Balance Amount",
        value: "initialBalanceAmount",
        sortable: false,
      },
      {
        text: "Current Balance Amount",
        value: "currentBalanceAmount",
        sortable: false,
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    productHeaders: [
      {
        text: "Company Name",
        value: "companyDetails.companyName",
        sortable: false,
      },
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "GST %",
        value: "gst",
        sortable: false,
      },
      {
        text: "HSN Code",
        value: "hsnCode",
        sortable: false,
      },
      {
        text: "Description",
        value: "description",
        sortable: false,
      },
      {
        text: "Created By",
        value: "createdBy",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    billCustomer: {},
    billItems: [],
    billDate: "",
    billFreighCharge: 0,
    billDescription: "",
    IGSTBillHeaders: [
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "productUnitPrice",
        sortable: false,
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
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
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    GSTBillHeaders: [
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Unit Price",
        value: "productUnitPrice",
        sortable: false,
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
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
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    deleteDialog: false,
    returnItems: [],
  },
  mutations: {
    // Snack Bar
    successSnackbar(state, payload) {
      state.snackbarColor = "green";
      state.snackbarText = payload;
      state.snackbar = true;
      setTimeout(() => {
        state.snackbar = false;
      }, state.snackbarTimeout);
    },
    errorSnackbar(state, payload) {
      state.snackbarColor = "red";
      state.snackbarText = payload;
      state.snackbar = true;
      setTimeout(() => {
        state.snackbar = false;
      }, state.snackbarTimeout);
    },
    // User Configurations
    setUserLogged(state, payload) {
      state.userLogged = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    updateAdminUser(state, payload) {
      state.adminUser = payload;
    },
    // Purchase Details
    setPurchaseCompany(state, payload) {
      state.purchaseCompany = payload;
    },
    setPurchaseDate(state, payload) {
      state.purchaseDate = payload;
    },
    updatePurchaseItem(state, payload) {
      state.purchaseItems.push(payload);
    },
    setPurchaseFreighCharge(state, payload) {
      state.purchaseFreighCharge = payload;
    },
    setPurchaseDescription(state, payload) {
      state.purchaseDescription = payload;
    },
    setPurchaseOtherAmount(state, payload) {
      state.purchaseOtherAmount = payload;
    },
    // Reset - Purchase Details
    resetPurchaseCompany(state) {
      state.purchaseCompany = {};
    },
    resetPurchaseDate(state) {
      state.purchaseDate = "";
    },
    resetPurchaseItem(state, payload) {
      if (state.purchaseItems.length > 0) {
        state.purchaseItems = payload;
      }
    },
    // resetPurchaseFreighCharge(state) {
    //   state.purchaseFreighCharge = "";
    // },
    // resetPurchaseDescription(state) {
    //   state.purchaseDescription = "";
    // },
    // Bill Details
    setBillCustomer(state, payload) {
      state.billCustomer = payload;
    },
    setBillDate(state, payload) {
      state.billDate = payload;
    },
    updateBillItem(state, payload) {
      state.billItems.push(payload);
    },
    setBillFreighCharge(state, payload) {
      state.billFreighCharge = payload;
    },
    setBillDescription(state, payload) {
      state.billDescription = payload;
    },
    // Reset - Bill Details
    resetBillCustomer(state) {
      state.billCustomer = {};
    },
    resetPurchaseDate(state) {
      state.billDate = "";
    },
    resetBillItem(state, payload) {
      if (state.billItems.length > 0) {
        state.billItems = payload;
      }
    },
    // Global Reset - Purchase & Bill
    resetPurchaseDetails(state) {
      state.purchaseCompany = {};
      state.purchaseDate = "";
      state.purchaseItems = [];
      state.purchaseDescription = "";
      state.purchaseFreighCharge = 0;
    },
    resetBillDetails(state) {
      state.billCustomer = {};
      state.billDate = "";
      state.billItems = [];
    },
    // Delete Dialog
    updateDeleteDialog(state, payload) {
      state.deleteDialog = payload;
    },
    // Return Products
    updateReturnItem(state, payload) {
      state.returnItems.push(payload);
    },
    resetReturnItem(state, payload) {
      if (state.returnItems.length > 0) {
        state.returnItems = payload;
      }
    },
  },
  actions: {
    login({ commit }, formData) {
      axios
        .post("/token/", formData)
        .then((res) => {
          Vue.prototype.$cookies.set("sathyaAgencies", res.data, 180 * 60 * 1, {
            httpOnly: true,
          });
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          commit("successSnackbar", "Logged in Successfully");
          commit("setUserLogged", true);
          commit("setUserName", res.data.userName);
          router.push("/dashboard");
        })
        .catch((err) => {
          commit("errorSnackbar", err.response.data.detail);
        });
    },
    logout({ commit }) {
      Vue.prototype.$cookies.remove("sathyaAgencies");
      delete axios.defaults.headers.common["Authorization"];
      commit("setUserLogged", false);
      router.push("/");
    },
  },
  modules: {},
  plugins: [],
});
