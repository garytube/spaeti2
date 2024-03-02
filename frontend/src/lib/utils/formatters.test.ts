import { addZero } from './formatters';

describe('test spaeti_base', function () {
  it('should add a trailing zero and add a € ', () => {
    expect(addZero(1)).toBe("1€")
    expect(addZero(1.2)).toBe("1.20€")
    expect(addZero(1.2342334)).toBe("1.2342334€")
  })
})