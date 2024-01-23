const login = async (req, res) => {
  res.send("Login user");
};
const register = async (req, res) => {
  res.send("register");
};

module.exports = { login, register };
