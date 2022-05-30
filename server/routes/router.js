import { Router } from "express";
import CarController from "../controllers/CarController.js";

const router = new Router()

router.post('/cars', CarController.create)
router.get('/cars', CarController.getAll)
router.get('/cars/:id', CarController.getOne)
router.put('/cars', CarController.update)
router.put('/carLike', CarController.changeLike)
router.put('/carViewed', CarController.changeViewed)

export default router;