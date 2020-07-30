<template>
    
  <div>
    <v-data-table :headers="headers" :items="NOTIFICATIONS">
      <template v-slot:item="row">
        <tr>
          <td></td>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.username }}</td>
          <td>{{ row.item.start_date }}</td>
          <td>{{ row.item.end_date }}</td>
          <td>{{ row.item.car_id }}</td>
          <td>
            {{ row.item.action }}
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="pink"
              @click="deleteItem(row.item)"
            >
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  <v-spacer></v-spacer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Notifications",
  components: {
  },
  data() {
    return {
      visible: false,

      headers: [
        {
          sortable: false,
          value: "name"
        },
        { text: "Id", value: "id" },
        { text: "Uzytkownik", value: "username" },
        { text: "Data rozpoczecia", value: "start_date" },
        { text: "Data konca", value: "end_date" },
        { text: "Id pojazdu", value: "car_id" }
      ],
     
    };
  },
  beforeCreate() {
   this.$store.dispatch("GET_NOTIFICATIONS_LIST");
  },
  computed: {
    ...mapGetters(["NOTIFICATIONS_LIST"]),
    NOTIFICATIONS() {
      return this.$store.getters.NOTIFICATIONS_LIST;
    },  
  },
  mounted: function() {
    this.$store.dispatch("GET_NOTIFICATIONS_LIST");
    this.interval = setInterval(function() {
    this.$store.dispatch("GET_NOTIFICATIONS_LIST");
    }.bind(this),9000);
    this.updateTalbe();
  },
  methods: {
     deleteItem(item) {
       this.id=item.id;
            confirm('Czy na pewno chcesz wymazac powiadomienie?')
             &&this.$store.dispatch("DELETE_NOTIFICATIONS",{id: this.id}).then(success=>{
            this.$router.push('/notifications')
        }).catch(error=>{
            console.log(error);

        })
            
     },
    
  
    },
    
};
</script>
