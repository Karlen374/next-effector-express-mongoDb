import { Router } from "express";
import CarController from "../controllers/CarController.js";
import ModelController from "../controllers/ModelController.js";
import BrandController from "../controllers/BrandController.js";


const router = new Router()

router.post('/cars', CarController.create)
router.get('/cars', CarController.getAll)
router.get('/cars/:id', CarController.getOne)
router.put('/cars', CarController.update)
router.put('/carLike', CarController.changeLike)
router.put('/carViewed', CarController.changeViewed)
router.get('/getIdArray', CarController.getIdArray)
router.post('/addPhoto',CarController.uploadCarPhoto)
router.delete('/delPhoto',CarController.deleteCarPhoto)

router.post('/models', ModelController.create)
router.put('/models', ModelController.getModelsByInputText)

router.post('/brands', BrandController.create)
router.put('/brands', BrandController.getBrandsByInputText)


export default router;