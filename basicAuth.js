// authUser es un middleware que intercepta el req.usuario para validar su existencia, de existir un usuario continua NEXT();

function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403);
    return res.send("You need to sign in");
  }

  next();
}

//authRole es un metodo que define el parametro role y retorna un middleware, que nos indica si el rol del usuario que interceptamos en el request es igual al role que estamos pasado como argumento. Al invocar authRole('admin') nos haceguramos que solo los user.roles con el atributo que espesifiquemos en el argumento puedan completar la solicitud.
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
