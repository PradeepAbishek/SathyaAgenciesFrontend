<template>
  <v-app>
    <v-navigation-drawer
      app
      :expand-on-hover="sideBar"
      :mini-variant="sideBar"
      :color="color"
      v-if="userLogged"
    >
      <v-list dark nav>
        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="item in menuLists"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.path"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :color="color" dark v-if="userLogged">
      <h1 class="ttu">{{ companyName }}</h1>
      <v-spacer></v-spacer>
      <v-btn icon href="#" @click="sideBar = !sideBar">
        <v-icon v-if="sideBar">mdi-arrow-right-thick</v-icon>
        <v-icon v-else>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="48">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn text :color="color">
                {{ userName }}
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn to="/changeProfile" text :color="color">
                Change Password
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="logout" text :color="color">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-snackbar
        :value="snackbar"
        :color="snackbarColor"
        top
        right
        absolute
        text
      >
        {{ snackbarText }}
      </v-snackbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    sideBar: true,
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      // this.$store.commit("successSnackbar", "Logged out successfully");
      this.$store.commit("removeUserLogged");
    },
  },
  computed: {
    userLogged() {
      return this.$store.state.userLogged;
    },
    userName() {
      return this.$store.state.userName;
    },
    companyName() {
      return this.$store.state.companyName;
    },
    color() {
      return this.$store.state.color;
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
    snackbarColor() {
      return this.$store.state.snackbarColor;
    },
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    menuLists() {
      return this.$store.state.menuLists;
    },
  },
};
</script>
