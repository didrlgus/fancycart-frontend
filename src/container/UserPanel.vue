<template>
  <v-app>
    <vue-snotify />
    <div class="headers">
      <embHeaderV1 />
    </div>

    <!-- Menu for mobile -->
    <v-navigation-drawer v-model="mobileMenu" temporary absolute dark class="sidebar-bg">
      <emb-sidebar />
    </v-navigation-drawer>
    <router-view />
    <embFooterV1
      title="About company"
      description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo nesciunt pariatur laboriosam accusantium? Doloremque fugit unde explicabo consequuntur aliquid laudantium id voluptatum? Saepe earum, suscipit ex quos eius natus. "
      img="/static/images/cards.png">
    </embFooterV1>
  </v-app>
</template>

<script>
export default {
  computed: {
    mobileMenu: {
      get() {
        return this.$store.getters.sidebarOpen;
      },
      set(val) {
        this.$store.dispatch("toggleSidebar", val);
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
