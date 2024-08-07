const Seller = require('../models/Seller');
const addCar = async (req, res) => {
  try {
    const car = req.body;
    req.seller.cars.push(car);
    await req.seller.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



const getAllCars = async (req, res) => {
  try {
    res.send(req.user.cars);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { addCar, getAllCars };
