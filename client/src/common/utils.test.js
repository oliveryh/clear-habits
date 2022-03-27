import { weekSpread, weekSpreadSequential } from './utils'

describe('utils', () => {
  describe('weekSpread', () => {
    it('basic case', () => {
      expect(weekSpread('2022-03-19', 5)).toEqual([
        '2022-06',
        '2022-07',
        '2022-08',
        '2022-09',
        '2022-10',
        '2022-11',
      ])
    })
    it('across years', () => {
      expect(weekSpread('2022-01-08', 5)).toEqual([
        '2021-48',
        '2021-49',
        '2021-50',
        '2021-51',
        '2021-52',
        '2022-01',
      ])
    })
  })
  describe('weekSpreadSequential', () => {
    it('basic case', () => {
      expect(weekSpreadSequential('2021-01', '2021-03')).toEqual([
        '2021-01',
        '2021-02',
        '2021-03',
      ])
    })
    it('across years', () => {
      expect(weekSpreadSequential('2020-52', '2021-02')).toEqual([
        '2020-52',
        '2020-53',
        '2021-01',
        '2021-02',
      ])
    })
  })
})
