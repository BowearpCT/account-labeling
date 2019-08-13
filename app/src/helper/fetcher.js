const axios = require("axios");

export const login = async payload => {
  const result = await axios.post("http://localhost:3000/user/login", {
    username: payload.username,
    password: payload.password
  });
  return result;
};
