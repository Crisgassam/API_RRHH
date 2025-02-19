import jwt from 'jsonwebtoken';

//Este archivo es el que se encarga de la parte del token, descifrarlo, comprobar si es correcto, ver si el usuario corresponde...

const verifyToken = (req, res, next) => {
    //Cogemos la cabecera que pone authorization, por lo que la variable token debe contener Bearer y el token 
  let token = req.header('Authorization');

  //Si no hay token acceso denegado, alguien ha intentado hacer una petición sin tener token
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  //Si llego aquí sí que hay un token, pero se podría simular meter un token a través de la consola del navegador. Pero para nosotros para que el token sea valido debe usar la clave que nosotros hemos indicado en .env 
  try {
    // Elimina 'Bearer ' del header "Authorization"
    token = token.replace('Bearer ', '');

    //El token está cifrado por lo que tenemos que descifrarlo. Lo desciframos con la clave que hemos indicado en .env. 
    const decodedToken = jwt.verify(token, process.env.SECRET);
    //decodedToken debe ser un objeto que contenga el email del uduario y el id, a no ser que se produzca un error, poe ejemplo, que la clave sea inválida. 

    // Almacena la información del usuario decodificada en req.usuario
    // Lo malo del objeto token es que podemos añadirle atributos por ej token.nombre = "patata", el objeto req es el objeto que tiene toda la info de la petición, por lo que a ese objeto le añadimos un nuevo atributo usuario y le metemos lo que hemos decodificado del token. 
    req.usuario = {
      email: decodedToken.email,  // Asumiendo que el ID del usuario está en el token
      id: decodedToken.id,  // Asumiendo que el nombre de usuario está en el token
      // Puedes añadir más campos según lo que hayas incluido en el token
    };

    //Como es un middleware después de hacer todo lo que queríamos tenemos que usar next(), que es pasar a la siguiente fase. En este caso solo pasaríamos a la siguiente fase si el objeto es correcto. next() lo que hace es que si hay otro middleware despues se pasaría al siguiente middleware. 
    next();

    //Si la clave es inválida captamos el error y lo mandamos 
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

export default verifyToken;