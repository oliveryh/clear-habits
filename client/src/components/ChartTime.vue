<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h4 text-weight-light">Time Taken</div>
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'ChartTime',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {}
  },
  props: {
    dateRange: {
      type: Array,
    },
    data: {
      type: Array,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          formatter: function (value) {
            var hours = parseInt(value)

            var mins = parseInt((value * 60) % 60)
            var retString = `${mins}m`
            if (hours) {
              retString = `${hours}h` + ' ' + retString
            }
            return retString
          },
        },
        yaxis: {
          forceNiceScale: true,
          style: {
            colors: [],
            fontSize: '20px',
          },
          min: 0,
          labels: {
            formatter: function (value) {
              var hours = parseInt(value)
              var mins = parseInt((value * 60) % 60)
              var retString = `${mins}m`
              if (hours) {
                retString = `${hours}h` + ' ' + retString
              }
              return retString
            },
          },
        },
        xaxis: {
          style: {
            colors: [],
            fontSize: '20px',
          },
          axisBorder: {
            show: false,
          },
          type: 'datetime',
          categories: this.dateRange,
          labels: {
            format: 'ddd',
          },
        },
      }
    },
    series() {
      return [
        {
          name: 'Tasks',
          data: this.data,
        },
      ]
    },
  },
}
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>