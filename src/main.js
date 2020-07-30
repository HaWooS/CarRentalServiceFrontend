import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'vue-material-design-icons/styles.css';
import vuetify from './plugins/vuetify';
import Login from './components/Authentication/Login'
import Application from './components/Application'
import store from './stores/store'
import axios from 'axios';
import EditCars from './components/Services/EditCars.vue'
import CarMap from './components/Services/CarMap.vue'
import Globals from './components/Services/Globals.vue'
import EarningStatistics from './components/Services/EarningStatistics.vue'
import TripStatistics from './components/Services/TripStatistics.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Notifications from './components/Services/Notifications.vue'



Vue.config.productionTip = false
Vue.use(VueRouter);
axios.defaults.baseURL='http://192.168.43.188:8080'; //trzeba ustawic to ip na ip komputera w aktualnej sieci
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: 'places'
  }
});


const routes = [
  {
    path: '/',
    component: Application,
    name: 'Application',
    children: [
      {
        path: '/cars/:id',
        component: Login,
        name: 'Login'
      },
      {
       path: '/editCars',
       component: EditCars,
       name: 'EditCars'
      },
      {
        path: '/map',
        component: CarMap,
        name: 'Map'
      },
      {
        path: '/earningStatistics',
        component: EarningStatistics,
        name: 'EarningStatistics'
      },
      {
        path: '/tripStatistics',
        component: TripStatistics,
        name: 'TripStatistics'
      },
      {
        path: '/globals',
        component: Globals,
        name: 'Globals'
      },
      {
        path: '/notifications',
        component: Notifications,
        name: 'Notifications'
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/editCars',
    component: EditCars,
    name: 'EditCars'
   }

];
const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/'
})


document.addEventListener('DOMContentLoaded',function(){
  Vue.component('google-map',VueGoogleMaps.Map);
  Vue.component('google-marker',VueGoogleMaps.Marker);
})

/*
Vue.component('line-chart', {
  extends: VueChartJs.Doughnut,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
  
})
*/
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
