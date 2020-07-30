   <template>
   <div>
     <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.price"
                  label="Price"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="updateFuelCost(item)">Zapisz</v-btn>
             <v-btn color="blue darken-1" flat @click.native="cancelUpdating">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-data-table :headers="headers" :items="FUEL">
      <template v-slot:item="row">
        <tr>
          <td></td>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.price }}</td>
          <td>{{ row.item.last_modified }}</td>
          <td>
            {{ row.item.action }}
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="green"
              @click="onButtonClick(row.item)"
            >
              <v-icon dark>edit</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "CarMap",
  components: {
  },
  data() {
    return {
      dialog : false,
      headers: [
        { text: "", value: "" },
        { text: "Id", value: "id"},
        { text: "Price", value: "price"},
        { text: "last_modified", value: "last_modified"},
        { text: "Action" },
      ],
        item: {
          id: '',
          price: '',
          last_modified: ''
      },
      fuel:[{id:1,price:2.32,last_modified:'2020-01-02 23:23:23'}],
      editedItem: {
        id: 0,
        price: 0,
        last_modified: 0,
      },
    };
  },
  beforeCreate() {
   this.$store.dispatch("GET_FUEL_LIST");
  },
  computed: {
    ...mapGetters(["FUEL_LIST"]),
    FUEL(){
      return this.$store.getters.FUEL_LIST;
    },
    formTitle() {        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'    },
    displayCars(){
      return this.$store.dispatch("GET_FUEL_LIST");
    }

  },
  mounted: function() {
    this.$store.dispatch("GET_FUEL_LIST");
    this.interval = setInterval(function() {
    this.$store.dispatch("GET_FUEL_LIST");
    }.bind(this),9000);
    this.updateTalbe();
  },
  methods: {
    onButtonClick(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true  
    },
    cancelUpdating(){
      this.dialog=false;
    },
    updateFuelCost(item){
      this.price=item.price;
      this.$store.dispatch("UPDATE_FUEL_COST",{
        price: this.price
      }).then(success=>{
        this.$router.push('/globals')
        this.dialog=false;
      }).catch(error=>{
        console.log(error);
      })
    }

  },
  //watch: {    dialog(val) {        val || this.close()    }}
};
</script>
