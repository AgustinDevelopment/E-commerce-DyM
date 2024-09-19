import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { body } from 'express-validator';
import { handleInputErrors } from "../middleware/validation";

const userRouter = Router();

// Ruta para crear un Producto
userRouter.post('/', 
    
    
    UserController.createUser
)

export default userRouter

