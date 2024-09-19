import { Request, Response } from 'express';
import {User} from '../models/User';

export class UserController {
  // Crear usuario
  static async createUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      // Verificar si el email ya está en uso
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }

      // Crear el usuario
      const user = await User.create({ name, email, password, role });
      res.status(201).json({ message: 'Usuario creado con éxito', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

  // Iniciar sesión (login)
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Buscar el usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }

      // Verificar la contraseña (aquí solo compara si las contraseñas coinciden directamente)
      if (user.password !== password) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }

      // Responder con los datos del usuario (sin token)
      res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  }
}
