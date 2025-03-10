import { dbPromise } from '../database/database.js';

class UsuarioModel {
  async getAllUsuarios() {
    const db = await dbPromise;
    return db.all('SELECT * FROM USUARIO');
  }

  async getUsuarioById(id) {
    const db = await dbPromise;
    return db.get('SELECT * FROM USUARIO WHERE id = ?', id);
  }

  async createUsuario(nombre, email, clave, tlf, dni) {
    const db = await dbPromise;
    return db.run('INSERT INTO USUARIO (nombre, email, clave, tlf, dni) VALUES (?, ?, ?, ?, ?)', nombre, email, clave, tlf, dni);
  }

  async updateUsuario(id, nombre, email, clave, tlf, dni) {
    const db = await dbPromise;
    if (clave) {
      return db.run('UPDATE USUARIO SET nombre = ?, email = ?, clave = ?, tlf = ?, dni = ? WHERE id = ?', nombre, email, clave, tlf, dni, id);
    }
    return db.run('UPDATE USUARIO SET nombre = ?, email = ?, tlf = ?, dni = ? WHERE id = ?', nombre, email, tlf, dni, id);
  }

  async deleteUsuario(id) {
    const db = await dbPromise;
    return db.run('DELETE FROM USUARIO WHERE id = ?', id);
  }

  async getUsuarioByEmail(email) {
    const db = await dbPromise;
    return db.get('SELECT * FROM USUARIO WHERE email= ? ', email);
  }
}


export default new UsuarioModel();