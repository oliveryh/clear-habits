import Vue from 'vue'
import '@/quasar'

import { mixins } from '@/main'

Vue.mixin(mixins)

const newViewports = {
  weekly: {
    name: 'Weekly Width',
    styles: {
      width: '247px',
      height: '963px',
    },
  },
}

export const parameters = {
  viewport: {
    viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'someDefault',
  },
}
