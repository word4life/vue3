
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
//import { routes } from 'vue-router/auto-routes'
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import About from '../views/About.vue';
import CallAPI from '../views/CallAPI.vue';
import ProviderList from '../views/ProviderList.vue'
import ProviderSearch from '../views/ProviderSearch.vue'
import VisitorInfo from '../views/VisitorInfo.vue'
import UsageDashboard from '../views/UsageDashboard.vue';
// import { c } from 'node_modules/unplugin-vue-router/dist/types-DBiN4-4c';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/call_api',
    name: 'Call API',
    component: CallAPI,
  },
  {
    path: '/provider_list',
    name: 'Provider List',
    component: ProviderList,
  },
  {
    path: '/provider_search',
    name: 'Provider Search',
    component: ProviderSearch
  },
  {
    path: '/visitor_info', 
    name: 'Visitor Info',
    component: VisitorInfo
  },
  {
    path: '/usage_dashboard',
    name: 'Usage Dashboard',
    component: UsageDashboard
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})




// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router






