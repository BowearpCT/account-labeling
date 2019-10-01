const {
  checkFilter,
  checkSearch
} = require("../../helper/checker")

describe('test checker', () => {
  test('should return true if have labelsId in filter', () => {
    const expectedResult = true
    const data = [ [ 35 ], [], [], [] ]
    const result = checkFilter(data)
    expect(result).toBe(expectedResult);
  });
  test("shold return true if filter not have any labelsId", () => {
    const expectedResult = false
    const data = [ [], [], [], [] ]
    const result = checkFilter(data)
    expect(result).toBe(expectedResult);
  })
  test("should return true if search have values", ()=> {
    const expectedResult = true
    const data = "phu"
    const result = checkSearch(data)
    expect(result).toBe(expectedResult);
  })
  test("should return true if search have values", ()=> {
    const expectedResult = false
    const data = ""
    const result = checkSearch(data)
    expect(result).toBe(expectedResult);
  })
});
