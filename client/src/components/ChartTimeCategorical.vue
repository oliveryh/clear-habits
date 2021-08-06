<template>
  <div>
    <q-card v-if="series.length > 0">
      <q-card-section>
        <div class="row">
          <div class="col col-8">
            <div class="text-h4 text-weight-light">Time Taken</div>
          </div>
          <div class="col col-4">
            <q-toggle
              class="float-right"
              v-model="isStacked"
              label="Stacked %"
            />
          </div>
        </div>
        <br />
        <apexchart
          v-if="isStacked"
          :key="'stacked' + xaxisType"
          type="bar"
          :options="optionsStacked"
          :series="series"
        ></apexchart>
        <apexchart
          v-else
          :key="'notstacked' + xaxisType"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
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
      isStacked: false,
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
    optionsStacked() {
      return {
        chart: {
          toolbar: {
            show: false,
          },
          stacked: true,
          stackType: '100%',
          height: 400,
        },
        colors: this.colors != null ? this.colors : this.tenColorPalette,
        dataLabels: {
          formatter: function (value) {
            return Math.round(value * 10) / 10 + '%'
          },
        },
        legend: {
          position: 'right',
          offsetY: 40,
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
        yaxis: {
          decimalsInFloat: 2,
          labels: {
            formatter: function (value) {
              return Math.round(value * 10) / 10 + '%'
            },
          },
        },
        tooltip: {
          y: {
            formatter: this.hoursToReadable,
          },
        },
      }
    },
    options() {
      return {
        ...this.optionsStacked,
        ...{
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
          dataLabels: {
            formatter: this.hoursToReadable,
          },
          chart: {
            toolbar: {
              show: false,
            },
            stacked: true,
            height: 400,
          },
        },
      }
    },
    series() {
      return this.data || []
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