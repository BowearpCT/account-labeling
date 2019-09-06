const {findUserByRoleId } = require('../../helper/query');

describe('test sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expectResult = {
      id: 1,
      username: "admin001",
      password: "12345678",
      name: "jim",
      phone_number: "0922999318",
      role_id: 1,
      from_country_id: 1
    }
    expect(findUserByRoleId(1)).toBe(expectResult);
  });
});