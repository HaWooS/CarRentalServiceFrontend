<template>
    
  <div>
      <v-dialog v-model="newCarDialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2" @click.native="newCarForm">Dodaj pojazd</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Wprowadz dane nowego pojazdu</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
             <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.vin"
                  label="Nr VIN"
                  :rules='vinRules'
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.register_number"
                  label="Nr rejestracji"
                  :rules='registerNumberRules'
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.deposit"
                  label="Koszt"
                  :rules="depositRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.latitude"
                  label="Dlg geo"
                  :rules="latitudeRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.longitude"
                  label="Szer geo"
                  :rules="longitudeRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.service"
                  label="Serwis"
                ></v-text-field>
                <v-switch
                   v-model="item.service"
                    ></v-switch>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="item.reservation"
                  label="Rezerwacja"
                ></v-text-field>
                <v-switch
                   v-model="item.reservation"
                 
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="saveNewCar(item)">Zapisz</v-btn>
             <v-btn color="blue darken-1" flat @click.native="cancelNewCar">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edytuj dane pojazdu</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.register_number"
                  label="Nr rejestracji"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.deposit"
                  label="Koszt"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.latitude"
                  label="Dlg geo"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.longitude"
                  label="Szer geo"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.service"
                  label="Serwis"
                  required
                ></v-text-field>
                <v-switch
                   v-model="editedItem.service"
                    ></v-switch>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.reservation"
                  label="Rezerwacja"
                  required
                ></v-text-field>
                 <v-switch
                   v-model="editedItem.reservation"
                    ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveExistingCar(editedItem)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-data-table :headers="headers" :items="CARS">
      <template v-slot:item="row">
        <tr>
          <td></td>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.vin }}</td>
          <td>{{ row.item.register_number }}</td>
          <td>{{ row.item.deposit }}</td>
          <td>{{ row.item.latitude }}</td>
          <td>{{ row.item.longitude }}</td>
          <td>{{ row.item.service }}</td>
          <td>{{ row.item.reservation }}</td>
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
  name: "CarMap",
  components: {
  },
  data() {
    return {
      visible: false,


      vinRules: [v => !!v || "The input is required"],
      registerNumberRules:  [v => !!v || "The input is required"],
      depositRules:  [v => !!v || "The input is required"],
      latitudeRules:  [v => !!v || "The input is required"],
      longitudeRules:  [v => !!v || "The input is required"],
      serviceRules:  [v => !!v || "The input is required"],
      reservationRules:  [v => !!v || "The input is required"],

      id: '',
      vin: '',
      register_number: '',
      deposit: '',
      latitude: '',
      longitude: '',
      service: '',
      reservation: '',
      dialog: false,
      newCarDialog: false,
      selected: [],
      headers: [
        {
          sortable: false,
          value: "name"
        },
        { text: "Id", value: "id" },
        { text: "Vin", value: "vin" },
        { text: "Nr rejestracji", value: "register_number" },
        { text: "Koszt", value: "deposit" },
        { text: "Dlugosc geo", value: "latitude" },
        { text: "Szerokosc geo", value: "longitude" },
        { text: "Serwis", value: "service" },
        { text: "Rezerwacja", value: "reservation" },
        { text: "Action" }
      ],
      headersFuel: [
        { text: "Id", value: "id"},
        { text: "Price", value: "price"},
        { text: "Modified", value: "last_modified"},
        { text: "Action" }
      ],
      fuel:{id:1,price:2.32,last_modified:'2020-01-02 23:23:23'},
      editedIndex: -1,
      editedItem: {
        register_number: 0,
        deposit: 0,
        latitude: 0,
        longitude: 0,
        service: 0,
        reservation: 0
      },

      item: {
          vin: '',
          register_number: '',
          deposit: '',
          longitude: '',
          latitude: '',
          service: '',
          reservation: ''
      },
      listPrimitive: null
    };
  },
  beforeCreate() {
   this.$store.dispatch("GET_CAR_LIST");
   this.$store.dispatch("GET_FUEL_LIST");
  },
  computed: {
    ...mapGetters(["CAR_LIST"],["FUEL_LIST"]),
    CARS() {
      return this.$store.getters.CAR_LIST;
    },
    FUEL(){
      return this.$store.getters.FUEL_LIST;
    },
    formTitle() {        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'    },
    displayCars(){
      return this.$store.dispatch("GET_CAR_LIST");
    }

  },
  mounted: function() {
    this.$store.dispatch("GET_CAR_LIST");
    this.$store.dispatch("GET_FUEL_LIST");
    this.interval = setInterval(function() {
    this.$store.dispatch("GET_CAR_LIST");
    this.$store.dispatch("GET_FUEL_LIST");
    }.bind(this),9000);
    this.updateTalbe();
  },
  methods: {
    updateTalbe(){
      this.visible=false;
      this.visible=true;
    },
    onsButtonClick(item) {
      console.log("click on " + item.id);
    },
     onButtonClick(item) {
            // this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                     this.dialog = true  },
    close() { 
            this.dialog = false 
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                        this.editedIndex = -1    }, 600)  },
     deleteItem(item) {
       // const index = this.desserts.indexOf(item)
       this.id=item.id;
            confirm('Czy na pewno chcesz usunąć trwale pojazd?')
             &&this.$store.dispatch("DELETE_CAR",{id: this.id}).then(success=>{
            this.$router.push('/editCars')
        }).catch(error=>{
            console.log(error);

        })
            
     },
    newCarForm() {
        this.newCarDialog=true;
    },
    cancelNewCar(){
        this.newCarDialog=false;
    },
    saveNewCar(item){
        this.vin = item.vin;
        this.register_number = item.register_number;
        this.deposit = item.deposit;
        this.latitude = item.latitude;
        this.longitude = item.longitude;
        this.service = item.service;
        this.reservation = item.reservation;
        this.$store.dispatch("CREATE_NEW_CAR",{
            vin: this.vin,
            register_number: this.register_number,
            deposit: this.deposit,
            latitude: this.latitude,
            longitude: this.longitude,
            service: this.service,
            reservation: this.reservation
        }).then(success=>{
            this.$router.push('/editCars')
            this.newCarDialog=false;
        }).catch(error=>{
            console.log(error);

        })
    
        
    },
    saveExistingCar(editedItem){  
      console.log('rozpoczynamy')
      this.id=editedItem.id;
      console.log('id itemu'+this.id)
       this.register_number = editedItem.register_number;
        this.deposit =editedItem.deposit;
        this.latitude = editedItem.latitude;
        this.longitude = editedItem.longitude;
        this.service = editedItem.service;
        this.reservation = editedItem.reservation;
        this.id=editedItem.id;
        this.$store.dispatch("UPDATE_EXISTING_CAR",{
          register_number: this.register_number,
          deposit: this.deposit,
          latitude: this.latitude,
          longitude: this.longitude,
          service: this.service,
          reservation: this.reservation,
          id: this.id
        }).then(success => {
          this.$router.push('/editCars')
          this.dialog=false;
        }).catch(error=>{
          console.log(error+'Update pojazdu niepomyslny')
        })

    }

  },
  //watch: {    dialog(val) {        val || this.close()    }}
};
</script>
