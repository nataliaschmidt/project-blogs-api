const { createToken } = require('../auth/auth');
const { userService } = require('../services');

const isValidFields = (email, password) => email && password;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidFields(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const foundUser = await userService.getByUserEmail(email);

    if (!foundUser || foundUser.dataValues.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const payload = { data: email };
    const token = createToken(payload);
    console.log(token);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
};