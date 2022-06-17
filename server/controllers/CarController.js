import Car from "../models/Car.js";
import config from "../config.js";
import { v4 as uuidv4 } from 'uuid';

class CarController {
  async create (req, res) {
    try {
      const { id, brand, model, price, releaseYear, description, viewed, liked, userId, userName } = req.body
      const car = await Car.create({ id,_id:id, brand, model, price, releaseYear, description, viewed, liked, userId, userName })
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
  async getIdArray (req,res) {
    try{
      const Cars = await Car.find()
      const data = Cars.map(item => item.id)
      return res.status(200).json(data)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async uploadCarPhoto(req, res) {
    try {
        const file = req.files.file
        const car = await Car.findById(req.headers.carid)
        const carPhotoName = uuidv4() + ".jpg"
        file.mv(config.staticPath + "\\cars\\" + carPhotoName)
        car.carPhoto = carPhotoName
        await car.save()
        return res.json(car)
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'ошибка загрузки Фотографии'})
    }
  }
}
//40ab3b08-129d-4270-b2b8-12d73f953046
export default new CarController();