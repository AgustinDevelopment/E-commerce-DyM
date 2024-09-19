import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { body } from 'express-validator';
import { handleInputErrors } from "../middleware/validation";

const productRouter = Router();

// Ruta para crear un Producto
productRouter.post('/', 
    
    body('name')
    .notEmpty().withMessage('El nombre del Producto es obligatorio'),
    
    body('description')
    .notEmpty().withMessage('La descripcion es obligatoria'),

    body('price')
    .notEmpty().withMessage('El precio es obligatorio'),

    handleInputErrors,
    ProductController.createProduct
)

// Ruta para obtener todos los Productos
productRouter.get('/', ProductController.getAllProducts)

// Ruta para obtener Producto por su id
productRouter.get('/:id', ProductController.getProductById)

// Ruta para actualizar un Producto
productRouter.put('/:id', ProductController.updateProduct)

// Ruta para eliminar un Producto
productRouter.delete('/:id', ProductController.deleteProduct)

export default productRouter;
