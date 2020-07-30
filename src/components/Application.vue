<template>
  <v-app class="grey-lighten-4" style="
  background: #3A1C71;
  background: -webkit-linear-gradient(to right,#373B44,#4286f4);
  background: linear-gradient(to right,#373B44,#4286f4);
">
      <Menu/>
      <v-content>
          <router-view keep-alive></router-view>
      </v-content>
  </v-app>
</template>
<script>

import Menu from './Authentication/Menu'
export default {
    name: "application",
    components: {Menu}
};
</script>




