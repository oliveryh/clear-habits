import { weekSpreadSequential } from './utils'

describe('utils', () => {
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
