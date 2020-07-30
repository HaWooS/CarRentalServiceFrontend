
<template>

  <div class = "content" align="center" >
    <v-btn slot="activator" color="primary" dark class="mb-2" @click.native="refreshCarsPositions">Wczytaj pozycje pojazdów</v-btn><br>
 
    <GmapMap
      ref="mapRef"
      :center="{lat: 50.8678166,
          lng: 20.6254579}"
      :zoom=14.25
      style="width:90%;  height: 90%;"
    >
  <GmapMarker
    :key="index"
    v-for="(m, index) in leasedCars"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :icon={url:urlblue}
    @click="openWindow">
      <gmap-info-window 
        @closeclick="window_open=false" 
        :opened="window_open" 
        :position="infowindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
    >{{m.vin}}</gmap-info-window>
    </GmapMarker>/>

 <GmapMarker
    :key="index"
    v-for="(m, index) in availableCars"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :icon={url:urlgreen}
    @click="openWindow">
      <gmap-info-window 
        @closeclick="window_open=false" 
        :opened="window_open" 
        :position="infowindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
    >{{m.vin}}</gmap-info-window>
    </GmapMarker>/>

    <GmapMarker
    :key="index"
    v-for="(m, index) in reservedCars"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :icon={url:urlred}
    @click="openWindow">
      <gmap-info-window 
        @closeclick="window_open=false" 
        :opened="window_open" 
        :position="infowindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
    >{{m.vin}}</gmap-info-window>
    </GmapMarker>
    
    </GMapMap>
  </div>

</template>
<script>
import {mapGetters} from 'vuex';
import { fuchsia } from 'color-name';
import {gmapApi} from 'vue2-google-maps'

export default {
    props: ["longitude","latitude"],
    name: 'CarMap',
    components: {


    },
    data(){
        return{

          urlblue:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          urlgreen:"http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          urlred:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          isLoading: false,
           color: '#cc181e',
           color1: '#5bc0de',
           size: '45px',
           margin: '2px',
           radius: '2px',


          infoWindow: {
            position: {lat:0, lng:0},
            window_open: false,
            template: ''
          },
      center: { lat: 50.8678166,
          lng: 20.6254579 },
      currentPlace: null,
      cars:  this.$store.getters.CAR_LIST,
      leasedCars:[],
      availableCars:[],
      reservedCars:[],
      markerss:[],
      markers: [
        {
          position: {
             lat:50.8999208,
              lng:20.6258000
          },
          infoText: '<strong>Marker1</strong>'
        },
        {
          position: {
             lat:50.8911111,
              lng:20.6259999
          },
          infoText: '<strong>Marker2</strong>'
        },
        { position: {
           lat:50.8919905,
            lng:20.6259999
            },
          infoText: '<strong>Marker3</strong>'
        },
      ],
            }
    },
    computed: {
google: gmapApi,
        ...mapGetters(['CAR_LIST'],['CARS_POSITIONS'],['CARS_AVAILABLE_POSITIONS']),
       CARS() {

            //this.selected=this.$store.getters.CAR_LIST;
            return this.$store.getters.CAR_LIST;
            
        },
        POSITIONS(){
            return this.$store.getters.CARS_POSITIONS;
        }


    },
    mounted: function() {
      this.$store.dispatch('GET_AVAILABLE_CARS_POSITION');
      this.$store.dispatch('GET_RESERVED_CARS_POSITION');
      this.$store.dispatch('GET_LEASED_CARS_POSITION');
      this.availableCars=this.$store.getters.CARS_AVAILABLE_POSITIONS
      this.reservedCars=this.$store.getters.CARS_RESERVED_POSITIONS
      this.leasedCars=this.$store.getters.CARS_LEASED_POSITIONS
    }
  ,
    methods: {

    refreshCarsPositions(){
      this.$store.dispatch('GET_AVAILABLE_CARS_POSITION');
      this.$store.dispatch('GET_RESERVED_CARS_POSITION');
      this.$store.dispatch('GET_LEASED_CARS_POSITION');
      this.availableCars=this.$store.getters.CARS_AVAILABLE_POSITIONS;
      this.reservedCars=this.$store.getters.CARS_RESERVED_POSITIONS;
      this.leasedCars=this.$store.getters.CARS_LEASED_POSITIONS;
      console.log('dostepne auta')
      console.log(this.availableCars)
      console.log('zarezerwowane auta')
      console.log(this.reservedCars)
      console.log('wynajete auta')
      console.log(this.leasedCars)

    },
    // receives a place object via the autocomplete component
   
    openWindow(){
      this.window_open=true
    },


    setPlace(place) {
     // this.currentPlace = place;
    },
    vehicles(query){
      this.$store.dispatch('GET_CAR_LIST');
    }
    ,
    geolocate: function(cars) {

      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
         lat: 50.8678166,
          lng: 20.6254579
        };
        this.zoom = 14.25;
      });

    },
   
    
  }

}
</script>
<style scoped>
.content{
  margin-top: 0%;
  margin-left: 3%;
  margin-right: 3%;
  width:94%;
  height: 98%;
}
</style>