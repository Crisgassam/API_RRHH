import express from 'express';
const router = express.Router();
//Protegemos las rutas
import verifyToken from '../middleware/authMiddleware.js';

import usuarioController from '../controllers/UsuarioController.js';

router.route('/')
  .get( verifyToken, usuarioController.getUsuarios )
  .post( verifyToken, usuarioController.postUsuario )
;

router.route('/:email')
  .get( usuarioController.getUsuario )
  .delete( verifyToken, usuarioController.deleteUsuario )
  .put( verifyToken, usuarioController.putUsuario )
;

export default router;
