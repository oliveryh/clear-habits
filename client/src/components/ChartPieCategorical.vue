<template>
  <div>
    <q-card v-if="series.length > 0">
      <q-card-section>
        <div class="text-h4 text-weight-light">Time Taken</div>
        <apexchart type="pie" :options="options" :series="series"></apexchart>
      </q-card-section>
    </q-card>
    <q-card v-else>
      <div class="q-pa-xl text-h4 text-weight-light text-grey-5">
        <q-icon name="mdi-database-off" /> No Data to Show
      </div>
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
      type: Object,
    },
    colors: {
      type: Array,
    },
  },
  computed: {
    series() {
      return this.data?.series || []
    },
    options() {
      return {
        chart: {
          width: '100%',
          type: 'donut',
        },
        colors: this.colors != null ? this.colors : this.tenColorPalette,
        labels: this.data?.labels,
        legend: {
          show: true,
        },
        tooltip: {
          y: {
            formatter: this.hoursToReadable,
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