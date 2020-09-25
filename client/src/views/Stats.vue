<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-md">
        <ch-week-selector v-model="startDate"></ch-week-selector>
      </div>
      <div class="col-12 col-md-6 q-pa-md">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker v-model="categorySelected" :projects="categories" label="Category"></ch-project-picker>
        </q-form>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <ch-chart-pie-categorical :data="getPieCategorical" :colors="getColors"></ch-chart-pie-categorical>
      </div>
      <div class="col-12 col-md-8 q-pa-md">
        <ch-chart-time-categorical
          :data="getTimesCategorical"
          :dateRange="dateSpread(this.startDate)"
          :colors="getColors"
        ></ch-chart-time-categorical>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <ch-chart-pie-categorical :data="getProjects"></ch-chart-pie-categorical>
      </div>
      <div class="col-12 col-md-8 q-pa-md">
        <ch-chart-time-categorical :data="getProjectsSum" :dateRange="dateSpread(this.startDate)"></ch-chart-time-categorical>
      </div>
    </div>
  </div>
</template>
<script>
import ChChartTimeCategorical from '@/components/ChartTimeCategorical.vue'
import ChChartPieCategorical from '@/components/ChartPieCategorical.vue'
import ChWeekSelector from '@/components/WeekSelector.vue'
import ChProjectPicker from '@/components/ProjectPicker'
import { mapState } from 'vuex'
import {
  A_CATEGORY_RETRIEVE,
  A_PROJECT_RETRIEVE,
  A_STATS_RETRIEVE,
} from '@/store/actions.type'

export default {
  name: 'Stats',
  components: {
    ChChartTimeCategorical,
    ChChartPieCategorical,
    ChWeekSelector,
    ChProjectPicker,
  },
  mounted() {
    this.statsRetrieve()
    this.categoriesRetrieve()
    this.projectsRetrieve()
  },
  data() {
    return {
      startDate: null,
      categorySelected: null,
    }
  },
  watch: {
    startDate() {
      this.statsRetrieve()
    },
  },
  computed: {
    ...mapState({
      stats: (state) => state.stats.stats,
      categories: (state) => state.settings.categories,
    }),
    getTimesCategorical() {
      if (Object.keys(this.stats).length !== 0) {
        return this.stats.statsBarCategory
      }
      return []
    },
    getPieCategorical() {
      if (Object.keys(this.stats).length !== 0) {
        return this.stats.statsPieCategory
      }
      return []
    },
    getProjects() {
      if (Object.keys(this.stats).length !== 0) {
        if (this.categorySelected != null) {
          console.log('CHANGED')
          return (
            this.stats.statsPieProject[this.categorySelected.description] || {
              labels: [],
              series: [],
            }
          )
        }
      }
      return []
    },
    getProjectsSum() {
      if (Object.keys(this.stats).length !== 0) {
        if (this.categorySelected != null) {
          return this.stats.statsBarProject[this.categorySelected.description]
        }
      }
      return []
    },
    getColors() {
      if (Object.keys(this.stats).length !== 0) {
        var colorDict = {}
        this.categories.map((value) => {
          colorDict[value['description']] = value['color']
        })

        return this.stats.statsBarCategory.map((value) => {
          return colorDict[value['name']] || '#000'
        })
      }
      return []
    },
  },
  methods: {
    statsRetrieve() {
      this.$store.dispatch(A_STATS_RETRIEVE, this.startDate)
    },
    categoriesRetrieve() {
      this.$store.dispatch(A_CATEGORY_RETRIEVE)
    },
    projectsRetrieve() {
      this.$store.dispatch(A_PROJECT_RETRIEVE)
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