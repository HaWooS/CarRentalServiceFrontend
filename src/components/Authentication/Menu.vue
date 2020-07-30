<template>
<div>
   <nav style="
  width: 100%; height: 20%; padding: 0px;
">
       <v-toolbar flat app color="blue">
          <v-app-bar-nav-icon class="white--text" @click="drawer =!drawer"></v-app-bar-nav-icon>
           <v-toolbar-title class="text-uppercase dark--text">
           <span class="font-weight-light">Admin</span>
           <span>Panel</span>
       </v-toolbar-title>
       <v-spacer></v-spacer>
            <v-btn flat color="dark" @click.prevent="logout()">
                <span>Wyloguj</span>
                <v-icon right></v-icon>
            </v-btn>
       </v-toolbar>

        <v-navigation-drawer v-model="drawer" class="primary">
            <v-list color="blue" dark>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          color="dark"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
  
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="onTitleClick(subItem.route)"
          >
          <router-link to=subItem.route></router-link>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
        </v-navigation-drawer>

   </nav>
</div>
</template>
<script>

export default {
    
    name: 'menu',
    components: {},
    data(){
        return{
           drawer: false,
           items: [
        {
          action: 'settings',
          title: 'Zarządzanie',
          items: [
            { title: 'Zarządzaj pojazdami', icon: '', route:'/editCars'},
            { title: 'Pokaż pojazdy', icon: '', route: '/map'},
            { title: 'Ceny globalne', icon: '', route: '/globals'},
            { title: 'Powiadomienia', icon: '', route: '/notifications'}
          ],
        },
        {
          action: 'show_chart',
          title: 'Statystyki',
          active: true,
          items: [
            { title: 'Statystyki przejazdów', route:'/tripStatistics'},
            { title: 'Statystyki zarobkowe', route:'/earningStatistics'}
          ],
        }]
        }
    },
    methods:{
        logout(){
         this.$store.dispatch("LOGOUT"
         )
         .then(success=> {
                
                this.$router.push("/login")
            })
            .catch(error=>{
                this.error=true;
            })
   
        },
        onTitleClick(route)
        {
            this.$router.push(route);
            console.log('clicked title');
        }
    }
}
</script>