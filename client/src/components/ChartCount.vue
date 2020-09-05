<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h4 text-weight-light">Tasks Complete</div>
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'ChartCount',
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
        yaxis: {
          forceNiceScale: true,
          style: {
            colors: [],
            fontSize: '20px',
          },
          labels: {
            formatter: function (value) {
              return parseInt(value)
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