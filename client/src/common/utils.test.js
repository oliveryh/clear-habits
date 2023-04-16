import { monthRangeSpread, weekRangeSpread, weekRange, monthRange, monthSpreadSequential, weekSpreadSequential } from './utils'

describe('utils', () => {
  describe('monthRange', () => {
    it('basic case', () => {
      expect(monthRange('2023-04-14', 12)).toEqual({
        start: '2022-05-01',
        end: '2023-04-30',
      })
    })
  })
  describe('monthRangeSpread', () => {
    it('basic case', () => {
      expect(monthRangeSpread('2023-04-14', 12)).toEqual([
        '2022-05',
        '2022-06',
        '2022-07',
        '2022-08',
        '2022-09',
        '2022-10',
        '2022-11',
        '2022-12',
        '2023-01',
        '2023-02',
        '2023-03',
        '2023-04',
      ])
    })
  })
  describe('monthSpreadSequential', () => {
    it('basic case', () => {
      expect(monthSpreadSequential('2021-01', '2021-03')).toEqual(['2021-01', '2021-02', '2021-03'])
    })
    it('across years', () => {
      expect(monthSpreadSequential('2021-11', '2022-02')).toEqual([
        '2021-11',
        '2021-12',
        '2022-01',
        '2022-02',
      ])
    })
    it('across years 2', () => {
      const monthSpreadResult = monthSpreadSequential('2021-11', '2023-01')
      expect(monthSpreadResult[0]).toEqual('2021-11')
      expect(monthSpreadResult[monthSpreadResult.length - 1]).toEqual('2023-01')
    })
  })
  describe('weekSpreadSequential', () => {
    it('basic case', () => {
      expect(weekSpreadSequential('2021-01', '2021-03')).toEqual(['2021-01', '2021-02', '2021-03'])
    })
    it('across years', () => {
      expect(weekSpreadSequential('2020-52', '2021-02')).toEqual([
        '2020-52',
        '2020-53',
        '2021-01',
        '2021-02',
      ])
    })
    it('across years 2', () => {
      const weekSpreadResult = weekSpreadSequential('2021-52', '2023-01')
      expect(weekSpreadResult[0]).toEqual('2021-52')
      expect(weekSpreadResult[weekSpreadResult.length - 1]).toEqual('2023-01')
    })
  })

  describe('weekRange', () => {
    it('basic case', () => {
      expect(weekRange('2023-04-14', 2)).toEqual({
        start: '2023-04-03',
        end: '2023-04-16'
      })
    })
    it('across months', () => {
      expect(weekRange('2023-04-14', 3)).toEqual({
        start: '2023-03-27',
        end: '2023-04-16'
      })
    })
  })
  describe('weekRangeSpread', () => {
    it('basic case', () => {
      expect(weekRangeSpread('2023-04-14', 5)).toEqual([
        '2023-11',
        '2023-12',
        '2023-13',
        '2023-14',
        '2023-15',
      ])
    })
    it('across years', () => {
      expect(weekRangeSpread('2022-01-08', 5)).toEqual([
        '2021-49',
        '2021-50',
        '2021-51',
        '2021-52',
        '2022-01',
      ])
    })
  })
})
