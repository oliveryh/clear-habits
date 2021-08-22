const CustomBuildHooksPlugin = (builder) => {
  builder.hook('build', (build) => {
    const { pgSql: sql } = build

    build.pgAggregateSpecs.push({
      id: 'maxDate',
      humanLabel: 'maximum date',
      HumanLabel: 'Maximum date',
      isSuitableType: (pgType) => true,
      shouldApplyToEntity: (pgAttribute) => pgAttribute.name === 'entry_date',
      sqlAggregateWrap: (sqlFrag) => sql.fragment`max(${sqlFrag})`,
    })

    build.pgAggregateSpecs.push({
      id: 'minDate',
      humanLabel: 'minimum date',
      HumanLabel: 'Minimum date',
      isSuitableType: (pgType) => true,
      shouldApplyToEntity: (pgAttribute) => pgAttribute.name === 'entry_date',
      sqlAggregateWrap: (sqlFrag) => sql.fragment`min(${sqlFrag})`,
    })

    return build
  })
}

module.exports = { CustomBuildHooksPlugin }
