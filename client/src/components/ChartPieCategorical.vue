<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { computed, watch, ref, defineComponent, onMounted } from '@vue/composition-api';

import { hoursToReadable } from '@/common/utils';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
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
    data: {
      type: Object,
    },
    colors: {
      type: Array,
    },
  },
  setup(props) {
    const option = ref({})
    const updatedData = computed(() => { return props.data })
    const updateChart = (newData) => {
      option.value = {
        tooltip: {
          trigger: 'item',
          confine: true,
          valueFormatter: hoursToReadable,
        },
        color: props.colors,
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: newData?.series.map((item, idx) => {
              return {
                value: item,
                name: newData?.labels[idx],
              }
            }),
          },
        ],
      }
    }
    onMounted(() => {
      updateChart(props.data)
    })
    watch(updatedData, (newVal) => {
      updateChart(newVal)
    });
    return { option };
  },
});
</script>

<style scoped>
.chart {
  min-height: 300px;
}
</style>
