<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <ch-week-selector v-model="startDate"></ch-week-selector>
      </div>
    </div>
    <div class="row">
      <div class="col col-6 q-pa-md">
        <ch-chart-count :data="getCounts" :dateRange="dateSpread(this.startDate)"></ch-chart-count>
      </div>
      <div class="col col-6 q-pa-md">
        <ch-chart-time :data="getTimes" :dateRange="dateSpread(this.startDate)"></ch-chart-time>
      </div>
    </div>
  </div>
</template>
<script>
import ChChartCount from '@/components/ChartCount.vue'
import ChChartTime from '@/components/ChartTime.vue'
import ChWeekSelector from '@/components/WeekSelector.vue'
import { mapState } from 'vuex'
import { A_STATS_RETRIEVE } from '@/store/actions.type'

export default {
  name: 'Stats',
  components: {
    ChChartCount,
    ChChartTime,
    ChWeekSelector,
  },
  mounted() {
    this.statsRetrieve()
  },
  data() {
    return {
      startDate: null,
    }
  },
  computed: {
    ...mapState({
      stats: (state) => state.stats.stats,
      getCounts() {
        if (Object.keys(this.stats).length !== 0) {
          return this.dateSpread(this.startDate).map((date) => {
            return this.stats.aggCountComplete[date] || 0
          })
        }
      },
      getTimes() {
        if (Object.keys(this.stats).length !== 0) {
          return this.dateSpread(this.startDate).map((date) => {
            return this.stats.aggSumTracked[date] || 0
          })
        }
      },
    }),
  },
  methods: {
    statsRetrieve() {
      this.$store.dispatch(A_STATS_RETRIEVE)
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