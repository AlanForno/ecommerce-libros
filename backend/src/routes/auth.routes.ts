import { Router } from 'express';
import type { Request, Response } from 'express'; // <--- ¡Asegúrate de cambiar esto!
import { prisma } from '../prisma.js'; // O '../prisma.ts'
import bcrypt from 'bcryptjs';

const router = Router();

// Registro de usuario
router.post('/register', async (req: Request, res: Response) => {
  const { nombre, apellido, email, password } = req.body;
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: { nombre, apellido, email, password: hashedPassword, rol: 'cliente' }
    });
    res.json({ id: usuario.id, email: usuario.email });
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(400).json({ error: 'El email ya existe' });
    }
    console.error(e);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ id: usuario.id, email: usuario.email, nombre: usuario.nombre });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;
