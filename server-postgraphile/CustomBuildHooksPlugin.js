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

    build.pgAggregateGroupBySpecs.push({
      id: 'month',
      humanLabel: 'monthmonth',
      HumanLabel: 'monthmonth',
      shouldApplyToEntity: (pgAttribute) => pgAttribute.name === 'entry_date',
      isSuitableType: (pgType) => true,
      sqlWrap: (sqlFrag) =>
        sql.fragment`
        CASE
            WHEN ${sqlFrag} = 'backlog' THEN 'backlog'
            ELSE to_char(TO_DATE(${sqlFrag},'YYYY-MM-DD'), 'IYYY-MM')
        END
        `,
    })

    return build
  })
}

module.exports = { CustomBuildHooksPlugin }
