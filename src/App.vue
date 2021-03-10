<template>
  <v-app>
    <v-navigation-drawer
      app
      :expand-on-hover="sideBar"
      :mini-variant="sideBar"
      color="#2c061f"
      v-if="userLogged"
    >
      <v-list dark nav>
        <v-list-item to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="ttu fw4">Dashboard</v-list-item-title>
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
              <v-list-item-title
                class="ttu fw4"
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.path"
          >
            <v-list-item-content>
              <v-list-item-title
                class="ttu fw4"
                v-text="child.title"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#2c061f" dark v-if="userLogged">
      <v-btn icon href="#" @click="sideBar = !sideBar">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <span class="ttu fw6">{{ companyName }}</span>
      <v-spacer></v-spacer>
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
        outlined
        
        transition="fab-transition"
        :value="snackbar"
        :color="snackbarColor"
        top
        right
        :timeout="snackbarTimeout"
        elevation="12"
      >
        <div class="tc f6 b i">{{ snackbarText }}</div>
      </v-snackbar>
      <v-container
        tag="section"
        fluid
        class="py-0"
        v-if="$route.name !== 'Login'"
      >
        <v-row>
          <v-col lg="12" sm="12" md="12">
            <v-sheet class="tc ttu fw4 i" dark >
              <span>{{ $route.name }}</span>
              <v-progress-linear
                buffer-value="0"
                stream
                color="white"
              ></v-progress-linear>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <router-view />
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
      this.$store.dispatch("logout");
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
    snackbarTimeout() {
      return this.$store.state.snackbarTimeout;
    },
    menuLists() {
      return this.$store.state.menuLists;
    },
  },
};
</script>
<style>
.v-list .v-list-item--active {
  color: #1976d2 !important;
}
</style>
