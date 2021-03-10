import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import UserProfile from "@/components/UserProfile";
import NewUser from "@/views/NewUser";
import ViewUser from "@/views/ViewUser";
import NewBank from "@/views/NewBank";
import ViewBank from "@/views/ViewBank";
import NewCustomer from "@/views/NewCustomer";
import ViewCustomer from "@/views/ViewCustomer";
import NewCompany from "@/views/NewCompany";
import ViewCompany from "@/views/ViewCompany";
import NewProduct from "@/views/NewProduct";
import ViewProduct from "@/views/ViewProduct";
import NewPurchase from "@/views/NewPurchase";
import ViewPurchase from "@/views/ViewPurchase";
import NewBill from "@/views/NewBill";
import ViewBill from "@/views/ViewBill";
import Dashboard from "@/views/Dashboard";
import store from "../store/index";
import NewPayment from "@/views/NewPayment";
import ViewPayment from "@/views/ViewPayment";
import NewReturn from "@/views/NewReturn";
import ViewReturn from "@/views/ViewReturn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/changeProfile",
    name: "Change Profile",
    component: UserProfile,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/newUser",
    name: "Add User",
    component: NewUser,
  },
  {
    path: "/viewUser",
    name: "View User",
    component: ViewUser,
  },
  {
    path: "/newBank",
    name: "New Bank",
    component: NewBank,
  },
  {
    path: "/viewBank",
    name: "View Bank",
    component: ViewBank,
  },
  {
    path: "/newCustomer",
    name: "New Customer",
    component: NewCustomer,
  },
  {
    path: "/viewCustomer",
    name: "View Customer",
    component: ViewCustomer,
  },
  {
    path: "/newCompany",
    name: "New Company",
    component: NewCompany,
  },
  {
    path: "/viewCompany",
    name: "View Company",
    component: ViewCompany,
  },
  {
    path: "/newProduct",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/viewProduct",
    name: "View Product",
    component: ViewProduct,
  },
  {
    path: "/newPurchase",
    name: "New Purchase",
    component: NewPurchase,
  },
  {
    path: "/viewPurchase",
    name: "View Purchase",
    component: ViewPurchase,
  },
  {
    path: "/newBill",
    name: "New Bill",
    component: NewBill,
  },
  {
    path: "/viewBill",
    name: "View Bill",
    component: ViewBill,
  },
  {
    path: "/newPayment",
    name: "New Payment",
    component: NewPayment,
  },
  {
    path: "/viewPayment",
    name: "View Payments",
    component: ViewPayment,
  },
  {
    path: "/newReturn",
    name: "New Return",
    component: NewReturn,
  },
  {
    path: "/viewReturn",
    name: "View Returns",
    component: ViewReturn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (Vue.$cookies.get("sathyaAgencies")) {
    const accessToken = Vue.$cookies.get("sathyaAgencies").access_token;
    const isAdmin = Vue.$cookies.get("sathyaAgencies").isAdmin;
    const userName = Vue.$cookies.get("sathyaAgencies").userName;

    if (!store.state.userLogged && accessToken !== null) {
      store.commit("setUserLogged", true);
    }
    if (!store.state.adminUser && isAdmin) {
      store.commit("updateAdminUser", true);
    }
    if (store.state.userName === "") {
      store.commit("setUserName", userName);
    }
    if (to.name !== "New Purchase" && store.state.purchaseItems.length > 0) {
      store.commit("resetPurchaseDetails");
    }
    if (to.name !== "New Bill" && store.state.billItems.length > 0) {
      store.commit("resetBillDetails");
    }
  } else {
    store.commit("setUserLogged", false);
    store.commit("updateAdminUser", false);
  }

  if (to.name !== "Login" && !store.state.userLogged) {
    next({ name: "Login" });
  } else {
    if (to.name === "Login" && store.state.userLogged) {
      next({ name: "Dashboard" });
    }
    next();
  }
});

export default router;
