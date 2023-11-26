<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { watch, computed, ref, defineComponent, onMounted } from '@vue/composition-api';

import { calculateMovingAverage, newShade, hoursToReadable } from '@/common/utils';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);


export default defineComponent({
  name: 'HelloWorld',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  props: {
    dateRange: {
      type: Array,
    },
    xaxisType: {
      type: String,
    },
    showMovingAverage: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
    },
    colors: {
      type: Object,
    },
  },
  setup(props) {
    const option = ref({})
    const updatedData = computed(() => { return props.data })
    const updateChart = (newData) => {
      option.value = {
        backgroundColor: '#fff',
        legend: {
          orient: 'horizontal',
          right: 'center',
          top: 20,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#eee',
            },
          },
          axisLabel: {
            formatter: hoursToReadable,
          }
        },
        xAxis: {
          type: 'category',
          data: props.dateRange,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
          valueFormatter: hoursToReadable,
        },
        aria: {
          show: true
        },
        series: newData.map((datum) => {
          return {
            type: 'bar',
            data: datum.data,
            stack: 'x',
            color: props.colors ? [props.colors[datum.name]] : undefined,
            name: datum.name,
            itemStyle: {
              normal: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 1
              },
            },
          }
        }).concat(
          newData.map((datum) => {
            if (!props.showMovingAverage) {
              return
            }
            const WINDOW_SIZE = 4
            return {
              type: 'line',
              showSymbol: false,
              smooth: true,
              data: calculateMovingAverage(datum.data, WINDOW_SIZE),
              color: props.colors ? [newShade(props.colors[datum.name], -10)] : undefined,
              name: `${datum.name} (${WINDOW_SIZE} ${props.xaxisType} avg)`,
              itemStyle: {
                normal: {
                  borderRadius: 5,
                  borderColor: '#fff',
                  borderWidth: 1
                },
              },
            }
          })
        ),
      }
    }
    onMounted(() => {
      updateChart(updatedData.value)
    })
    watch(updatedData, (newVal) => {
      updateChart(newVal)
    })

    return { option };
  },
});
</script>

<style scoped>
.chart {
  min-height: 300px;
}
</style>
