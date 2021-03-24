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
  name: 'ChartTimeCategorical',
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
    xaxisType: {
      type: String,
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
        chart: {
          toolbar: {
            show: false,
          },
          stacked: true,
          height: 400,
        },
        colors: this.colors != null ? this.colors : this.tenColorPalette,
        dataLabels: {
          formatter: this.hoursToReadable,
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        yaxis: {
          forceNiceScale: true,
          style: {
            colors: [],
            fontSize: '20px',
          },
          min: 0,
          labels: {
            formatter: this.hoursToReadable,
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
          type: this.xaxisType,
          categories: this.dateRange,
          labels: {
            format: 'ddd',
          },
        },
      }
    },
    series() {
      return this.data
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