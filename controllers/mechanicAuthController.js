const Mechanic = require('../models/Mechanic');
const signup = async (req, res) => {
  const seller = new Mechanic(req.body);
  try {
    await seller.save();
    const token = await seller.generateAuthToken();
    res.status(201).send({ seller, token });
  } catch (error) {
    console.error('mechanic Signup error:', error);
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const seller = await Mechanic.findByCredentials(req.body.email, req.body.password);
    const token = await seller.generateAuthToken();
    res.send({ seller, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { signup, login };
