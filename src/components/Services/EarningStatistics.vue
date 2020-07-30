<template>
 <div>
   
     <v-btn slot="activator" color="primary" dark class="mb-2" @click.native="getStatistics">Wczytaj Statystyki</v-btn><br>
  <v-app id="inspire">
    <v-row>
        <v-col cols="12" sm="6" md="4">
        <v-dialog
          ref="dialogS"
          v-model="modelS"
          :return-value.sync="startDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Data początku"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogS.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-dialog
          ref="dialogE"
          v-model="modelE"
          :return-value.sync="endDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endDate"
              label="Data końca"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogE.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
         <v-spacer></v-spacer>
    </v-row>
  </v-app>
    <div class="Chart" >
      <DoughnutChart
        ref="skills_chart"
        :chart-data="chartData"
        :styles = "Chart"
       :options="options">
      </DoughnutChart>
      
    </div>
  </div>
  
</template>
<script>
import DoughnutChart from './../charts/DoughnutChart'
import randomColor from 'randomcolor';
import {mapGetters} from 'vuex';

const options = {
  responsive: true, 
  maintainAspectRatio: true, 
  animation: {
    animateRotate: true
  }
}
export default {
    name: 'EarningStatistics',
    components: {
       DoughnutChart

    },
    data(){
    return{
    options,
    date: new Date().toISOString().substr(0, 10),
    modelS: false,
    modelE: false,
    startDate: null,
    endDate: null,
    chartData: {
    labels: [],
    datasets: [
      {
            backgroundColor: [],
            data: []
      }
      ]
    },
    }
    },
    computed: {
    ...mapGetters(['CARS_RESERVED_POSITIONS'])
    },
    methods: {
      async getStatistics(){
      this.$store.dispatch('GET_EARNING_DATA',{
        startDate: this.startDate,
        endDate: this.endDate
      }).then(success=>
      console.log("Wczytano nowe staty"),
      ).then(()=>{this.updateDoughnutChart()})
      },
      updateDoughnutChart(){
      let iterator = this.$store.getters.STATS_EARNING_DATA.map(data=>data.car).length;
       let colortab= [];
       for(var i=0; i<iterator; i++)
         {
           console.log(this.chartData.labels.length);
           colortab.push(randomColor())
         }
      let newChartData = {
      labels: this.$store.getters.STATS_EARNING_DATA.map(data=>data.car),
      datasets: [
        {
          backgroundColor: colortab,
          data: this.$store.getters.STATS_EARNING_DATA.map(data=>data.cost)
        }
        ]

      }
      return this.$refs.skills_chart.reRender(newChartData);
     
      }
    }

}
</script>
<style scoped>
.Chart{
    width: 35%;
    height: 35%;
    margin: 0;    
    position: absolute;
    top: 25%;
    left: 50%;
    margin-right: -50%;
    margin-top:5%;
    transform: translate(-50%, -50%) 
}
.my-datepicker >>> .my-datepicker_calendar {
  width: 100%;
  height: 330px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 90px;
}
</style>