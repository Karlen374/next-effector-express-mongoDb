import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";
import AuthMiddleware from "../middleware/authMiddleware.js"; 
import RoleMiddleware from "../middleware/roleMiddleware.js";

const authRouter = new Router()

authRouter.post('/registration',[
  check('username',"Имя Пользователья не может быть пустым").notEmpty(),
  check('password',"Пароль должен быть больше 4 символов").isLength({min:4}),
], AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.get('/users',RoleMiddleware(["ADMIN"]), AuthController.getUsers)

export default authRouter;