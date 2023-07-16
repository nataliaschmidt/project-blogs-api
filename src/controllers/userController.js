const { createToken } = require('../auth/auth');
const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllUser = async (req, res) => {
  try {
    const { status, data } = await userService.findAllUser();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.findUserById(id);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const { status, data } = await userService.createUser(userInfo);

    if (status === 'INVALID_VALUE' || status === 'CONFLICT') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { password: _password, ...userWithoutPassword } = data;

    const payload = { data: userWithoutPassword };
    const token = createToken(payload);
    return res.status(mapStatusHTTP(status)).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.payload.data.id;
    const { status, data } = await userService.deleteUser(userId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllUser,
  createUser,
  findUserById,
  deleteUser,
};