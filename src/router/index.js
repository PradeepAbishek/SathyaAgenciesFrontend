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
import store from "../store/index";

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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && localStorage.getItem("userLogged") !== "true")
    next({ name: "Login" });
  else {
    if (localStorage.getItem("userLogged") === "true") {
      store.commit("setUserLogged");
      store.commit("setUserName", localStorage.getItem("userName"));
    }
    if (to.name === "Login" && localStorage.getItem("userLogged") === "true")
      next({ name: "About" });
    next();
  }
});

export default router;
