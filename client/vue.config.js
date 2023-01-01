module.exports = {
  transpileDependencies: ['quasar', '@carbon/charts-vue'],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  publicPath: '/tasks/',
}
