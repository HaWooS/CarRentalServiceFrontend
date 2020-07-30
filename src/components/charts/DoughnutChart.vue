<script>
import {Doughnut} from 'vue-chartjs'


export default {
  extends: Doughnut,
  props: ['chartData','options',],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    reRender: function(chartDataFromParent){
    this.chartData=chartDataFromParent;
    console.log(chartDataFromParent);
     //this._chart.destroy()
      //this._data._chart.destroy();
      this.$data._chart.destroy
      this.renderChart(this.chartData,this.options)
    }
  },
  watch: {
    chartdata: function() {
      console.log("łoczer obserwuje");
      //this._chart.destroy()
      this._data._chart.destroy();
      this.renderChart(this.chartData,this.options)
    }
  }
}
</script>