import Car from "../models/Car.js";


class CarController {
  async create (req, res) {
    try {
      const { id, brand, model, price, releaseYear, description, viewed, liked } = req.body
      const car = await Car.create({ id,_id:id, brand, model, price, releaseYear, description, viewed, liked })
      res.status(200).json(car)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getAll (req,res) {
    try {
      const Cars = await Car.find()
      return res.json(Cars);
    } catch (e){
      res.status(500).json(e)
    }
  }
  async getOne (req,res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({message: 'Id не указан'})
      }
      const car = await Car.findById(id);
      return res.json(car)
    } catch (e){
      res.status(500).json(e)
    }
  }
  async update (req,res) {
    try {
      const car = req.body
      if (!car._id){
        res.status(400).json({message: 'Id не указан'})
      }
      const updatedCar = await Car.findByIdAndUpdate(car._id,car,{new:true})
      return res.status(200).json(updatedCar)
    } catch (e){
      res.status(500).json(e)
    }
  }
  async changeLike (req,res) {
    try {
      const carId = req.body
      const car = await Car.findById(carId)
      car.liked = !car.liked;
      const updatedCar = await Car.findByIdAndUpdate(car._id,car,{new:true})
      return res.status(200).json(updatedCar)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async changeViewed (req,res) {
    try {
      const carId = req.body
      const car = await Car.findById(carId)
      car.viewed = true;
      const updatedCar = await Car.findByIdAndUpdate(car._id,car,{new:true})
      return res.status(200).json(updatedCar)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new CarController();