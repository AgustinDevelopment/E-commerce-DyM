import { Request, Response } from 'express';
import Product from '../models/Product';
import {User} from '../models/User'

export class ProductController {
  // Crear un producto
  static async createProduct(req: Request, res: Response) {
    const { name, description, price, ownerId } = req.body;

    try {
      // Verificar que el ownerId existe en la tabla de usuarios
      const owner = await User.findByPk(ownerId);
      if (!owner) {
        return res.status(400).json({ message: 'El ID del propietario no existe' });
      }

      // Verificar que el usuario es un admin o un employee
      if (owner.role == 'employee') {
        return res.status(403).json({ message: 'El usuario no tiene permisos para crear productos' });
      }

      // Crear el producto
      const product = await Product.create({ name, description, price, ownerId });
      res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }

  // Obtener todos los productos
  static async getAllProducts(req: Request, res: Response) {
    try {
      // Obtener todos los productos
      const products = await Product.findAll();
      res.json({ products });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ message: 'Error al obtener productos', error });
    }
  }

  // Obtener un producto por ID
  static async getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);

    try {
      // Obtener el producto por ID
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ product });
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  }

  // Actualizar un producto por ID
  static async updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);
    const { name, description, price } = req.body;

    try {
      // Obtener el producto por ID
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Actualizar el producto
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;

      await product.save();
      res.json({ message: 'Producto actualizado con éxito', product });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  }

  // Eliminar un producto por ID
  static async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);

    try {
      // Obtener el producto por ID
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Eliminar el producto
      await product.destroy();
      res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
}
