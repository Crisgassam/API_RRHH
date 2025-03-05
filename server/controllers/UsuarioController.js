// import notas from '../database/notas.json' with { type: 'json' };
import bcrypt from 'bcryptjs';
import usuarioModel from '../models/UsuarioModel.js';

class UsuarioController {
  constructor() { }

  async getUsuario(req, res) {
    try {
        //El await es porque no se lo que va a tardar la BD en responderme
      const datos = await usuarioModel.getUsuarioByEmail(req.params.email);
      if (datos) {
        //Si la nota se encuentra la devuelvo en objeto JSON, nuestra API siempre va a recibir y devolver objetos JSON
        res.json(datos);
      } else {
        //Si no ha encontrado la nota es error 404 que es not found, estás intentando acceder a algo que no existe
        res.status(404).json({ error: 'Usuario no encontrada' });
      }
    } catch (err) {
      //El error 500 sirve para error interno del servidor
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuarios(req, res) {
    try {
      const notas = await usuarioModel.getAllUsuarios();
      res.json(notas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postUsuario(req, res) {
    let { nombre, email, clave, tlf, dni } = req.body;

    // Validar que los campos obligatorios no estén vacíos
    if (!nombre || !email || !clave)
      return res.status(400).json({ error: "Los campos nombre, email y clave son obligatorios" });


    if (!tlf)
      tlf = null;

    if (!dni)
      dni = null;

    const saltRounds = 10;
    const claveHash = await bcrypt.hash(clave, saltRounds);
    try {
      //Cogemos el id del objeto usuario que hemos metido en el middleware
      const result = await usuarioModel.createUsuario(nombre, email, claveHash, tlf, dni);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Hay que modificar este método porque solo se pueden modificar las notas que son mias 
  async putUsuario(req, res) {
    let { nombre, email, clave, tlf, dni } = req.body;

    if (!nombre || !email || !clave)
      return res.status(400).json({ error: "Los campos nombre, email y clave son obligatorios" });


    if (!tlf)
      tlf = null;

    if (!dni)
      dni = null;

    const saltRounds = 10;
    const claveHash = await bcrypt.hash(clave, saltRounds);

    try {
      const result = await usuarioModel.updateUsuario(req.params.id, nombre, email, claveHash, tlf, dni);
      if (result.changes > 0) {
        res.json({ message: 'Usuario actualizado' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  //Este método es mas complejo porque solo el administrador puede eliminar una nota
  async deleteUsuario(req, res) {
    if (req.usuario.id != req.params.id) {
      res.status(400).json({ error: "No tienes permiso para eliminar el usuario." });
      return;
    }

    try {
      const result = await usuarioModel.deleteUsuario(req.params.id);
      //Si se ha eliminado al menos 1 se devuelve el mensaje nota eliminada
      if (result.changes > 0) {
        res.json({ message: 'Usuario eliminado' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default new UsuarioController();