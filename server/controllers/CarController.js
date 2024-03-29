import Car from "../models/Car.js";
import config from "../config.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { Certificate } from "crypto";

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
      const carId = req.body.carId
      const userId= req.body.userId
      const car = await Car.findById(carId)
      const check = car.likedUsersId.includes(userId);
      if (!check) car.likedUsersId.push(userId);
      else car.likedUsersId = car.likedUsersId.filter(item => item !== userId);
      const updatedCar = await Car.findByIdAndUpdate(car._id,car,{new:true})
      return res.status(200).json(updatedCar)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async changeViewed (req,res) {
    try {
      const carId = req.body.carId
      const userId= req.body.userId
      const car = await Car.findById(carId)
      const check = car.viewedUsersId.includes(userId);
      if (!check) car.viewedUsersId.push(userId);
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
  async deleteCarPhoto(req, res) {
    try {   
        const car = await Car.findById(req.headers.carid)
        fs.unlinkSync(config.staticPath + "\\cars\\" + car.carPhoto)
        car.carPhoto = null
        await car.save()
        return res.json(car)
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'ошибка удаления фотографии'})
    }
  }
}

export default new CarController();