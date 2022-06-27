import { Router } from "express";
import StaticController from "../controllers/StaticController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const staticRouter = new Router()

staticRouter.post('/avatar', AuthMiddleware,StaticController.uploadAvatar)
staticRouter.delete('/avatar',AuthMiddleware,StaticController.deleteAvatar)
export default staticRouter;