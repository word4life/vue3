<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer">
      <v-list-item title="Provider Search" subtitle="YOU'RE ALWAYS IN NETWORK"></v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <!-- <v-list-item-icon> -->
            <v-icon>{{ item.icon }} </v-icon> &nbsp; {{ item.title }}
          <!-- </v-list-item-icon> -->

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>NetsyMD</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue'


const drawer = ref(null)

export default {
  data: () => ({
    drawer: null,
    items: [
      // { title: 'Dog Pictures', icon: 'mdi-dog', to: '/' },
      // { title: 'History', icon: 'mdi-history', to: '/history' },
      // { title: 'Call API', icon: 'mdi-cloud', to: '/call_api' },
      // { title: 'Provider List', icon: 'mdi-account-group', to: '/provider_list' },
      { title: 'Provider Search', icon: 'mdi-account-search', to: '/provider_search' },
      { title: 'Visitor Info', icon: 'mdi-account-multiple', to: '/visitor_info' },
      { title: 'Usage Dashboard', icon: 'mdi-chart-bar', to: '/usage_dashboard' },
      { title: 'About', icon: 'mdi-account', to: '/about' },
    ]
  }),
 

}
</script>
