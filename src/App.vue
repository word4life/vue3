<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer">
      <v-list-item title="Dog API" subtitle="Random Dog Pictures"></v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }} </v-icon> &nbsp; {{ item.title }}
          </v-list-item-icon>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Dog Pictures</v-app-bar-title>
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
      { title: 'Dog Pictures', icon: 'mdi-dog', to: '/' },
      { title: 'History', icon: 'mdi-history', to: '/history' },
      { title: 'Call API', icon: 'mdi-cloud', to: '/call_api' },
      { title: 'Provider List', icon: 'mdi-account-group', to: '/provider_list' },
      { title: 'About', icon: 'mdi-account', to: '/about' },
    ]
  }),
 

}
</script>
