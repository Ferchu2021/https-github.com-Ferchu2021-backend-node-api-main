// No TypeScript type imports in JS files
// No type annotations in function parameters
// Simulación de búsqueda de usuario (deberías reemplazar esto con una consulta real a la base de datos)
export const validarUsuarioNoExiste = (req, res, next) => {
  // Simulación: Supón que el usuario existe si el email es "existe@ejemplo.com"
  const usuarioExiste = req.body && req.body.email === "existe@ejemplo.com";
  if (usuarioExiste) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }
  next();
};
  }
  next();
};
