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
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in menuLists"
            :key="i"
            :to="item.path"
            class="ttu fw5"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :color="color" dark v-if="userLogged">
      <h1 class="ttu i">{{ companyName }}</h1>
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
              <div class="ttu b">{{ userName }}</div>
              <v-divider class="my-3"></v-divider>
              <v-btn to="/changeProfile" depressed rounded text>
                Change Password
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    sideBar: true,
    //
  }),
  computed: {
    userLogged() {
      return this.$store.state.userLogged;
    },
    userName() {
      return this.$store.state.userDetails.userName;
    },
    companyName() {
      return this.$store.state.companyName;
    },
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
