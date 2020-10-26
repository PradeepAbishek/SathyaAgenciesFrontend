import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companyName: "Sathya Agencies",
    color: "green",
    userLogged: false,
    userName: "",
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
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
          { title: "Add User", path: "/newUser" },
          { title: "View Users", path: "/viewUser" },
        ],
        title: "Users",
      },
    ],
    purchaseItems: [],
    purchaseCompany: {},
    purchaseDate: "",
    purchaseModal: false,
    purchaseHeaders: [
      {
        text: "Product Name",
        value: "productName",
      },
      {
        text: "Unit Price",
        value: "unitPrice",
      },
      {
        text: "Product Quantity",
        value: "productQuantity",
      },
      {
        text: "Product Total Price",
        value: "productPrice",
      },

      {
        text: "GST %",
        value: "productGST",
      },
      {
        text: "GST Amount",
        value: "gstAmount",
      },
      {
        text: "Selling Price",
        value: "sellingPrice",
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
      },
      {
        text: "Active User",
        value: "isActive",
      },
      {
        text: "Admin Access",
        value: "isAdmin",
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
        value: "companyName",
      },
      {
        text: "Bank Name",
        value: "bankName",
      },
      {
        text: "Account Number",
        value: "accNumber",
      },
      {
        text: "IFSC Code",
        value: "ifscCode",
      },
      {
        text: "Branch Name",
        value: "branchName",
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
      },
      {
        text: "Address",
        value: "address",
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
      },
      {
        text: "GST Number",
        value: "gstNumber",
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
      },
      {
        text: "Address",
        value: "address",
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
      },
      {
        text: "GST Number",
        value: "gstNumber",
      },
      {
        text: "Mail Address",
        value: "mailAddress",
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
        value: "companyName",
      },
      {
        text: "Product Name",
        value: "productName",
      },
      {
        text: "GST %",
        value: "gst",
      },
      {
        text: "HSN Code",
        value: "hsnCode",
      },
      {
        text: "Description",
        value: "desc",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  },
  mutations: {
    successSnackbar(state, payload) {
      state.snackbarColor = "green";
      state.snackbarText = payload;
      state.snackbar = true;
    },
    errorSnackbar(state, payload) {
      state.snackbarColor = "red";
      state.snackbarText = payload;
      state.snackbar = true;
    },
    setUserLogged(state) {
      state.userLogged = true;
    },
    removeUserLogged(state) {
      state.userLogged = false;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    updatePurchaseItem(state, payload) {
      state.purchaseItems.push(payload);
    },
    setPurchaseCompany(state, payload) {
      state.purchaseCompany = payload;
    },
    setPurchaseDate(state, payload) {
      state.purchaseDate = payload;
    },
    resetPurchaseItem(state, payload) {
      if (state.purchaseItems.length > 0) {
        state.purchaseItems = payload;
      }
    },
    updatePurchaseModalState(state, payload) {
      state.purchaseModal = payload;
    },
    resetPurchaseCompany(state) {
      state.purchaseCompany = {};
    },
    resetPurchaseDate(state) {
      state.purchaseDate = "";
    },
  },
  actions: {},
  modules: {},
  plugins: [],
});
