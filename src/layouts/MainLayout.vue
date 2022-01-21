<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          <q-avatar>
            <img src="statics/icon.png" />
          </q-avatar>
          {{ title }}
        </q-toolbar-title>
        <q-btn
          color="teal"
          class="glossy"
          icon="logout"
          label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      :width="200"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2 text-grey-14 fit"
    >
      <q-scroll-area
        style="height: 90%; margin-top: 50px"
        class="bg-grey-2 text-grey-14"
      >
      
        <q-list v-for="(menuItem, index) in linksList" :key="index">
          <q-item clickable v-ripple :to="menuItem.to" exact>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.title }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      reveal
      elevated
      class="bg-grey-8 text-white"
      position="position: static"
    >
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-h6">West Central Lodge v0.1</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from "components/EssentialLink.vue";
import UserLink from "components/UserMenu.vue";
import { defineComponent, ref } from "vue";
import axios from "axios";
import { auth } from "boot/firebase";
const linksList = [
  {
    icon: "home",
    title: "Home",
    to: "/",
    // separator: true,
  },
  // {
  //   icon: "explore",
  //   title: "Explore",
  //   to: "/category",
  //   separator: false,
  // },

  // {
  //   icon: "article",
  //   title: "Projects Info",
  //   to: "/projectsinfo",
  //   separator: false,
  // },
  // {
  //   icon: "input",
  //   title: "Data Input",
  //   to: "/datainput",
  //   separator: false,
  // },
  {
    icon: "book",
    title: "Tenant",
    to: "/tenant",
    separator: false,
  },
];

import firebase from "firebase";
export default defineComponent({
  name: "MainLayout",

  data() {
    return {
      title: "",
      version: "",
      appbuild: "",
      linksList,
      currentUserEmail: "",
    };
  },
  components: {
    EssentialLink,
  },
  computed: {},
  created() {
    axios.get("statics/config.json").then((response) => {
      this.title = response.data.appTitle;
      this.version = response.data.appVersion;
      this.appbuild = response.data.appBuild;
      this.currentUserEmail = auth.currentUser?.email || "";
    });
  },
  method: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      logout() {
        firebase
          .auth()
          .signOut()
          .then(
            function () {
              window.location.href = "/#/Login";
            },
            function (error) {
              console.log(error);
            }
          );
      },
    };
  },
});
</script>

<style>
</style>