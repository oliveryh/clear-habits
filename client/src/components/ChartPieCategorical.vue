<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h4 text-weight-light">Time Taken</div>
        <apexchart type="pie" :options="options"></apexchart>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'ChartPieCategorical',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      tenColorPalette: [
        '#00c0c7',
        '#5144d3',
        '#e8871a',
        '#da3490',
        '#9089fa',
        '#47e26f',
        '#2780eb',
        '#6f38b1',
        '#dfbf03',
        '#cb6f10',
        '#268d6c',
        '#9bec54',
      ],
    }
  },
  props: {
    dateRange: {
      type: Array,
    },
    data: {
      type: Array,
    },
    colors: {
      type: Array,
    },
  },
  computed: {
    options() {
      return {
        series: this.data.series,
        chart: {
          width: '100%',
          type: 'donut',
        },
        colors: this.colors != null ? this.colors : this.tenColorPalette,
        labels: this.data.labels,
        legend: {
          show: true,
        },
        tooltip: {
          y: {
            formatter: function (value) {
              console.log(value)
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
      }
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