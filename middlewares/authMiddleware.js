// Este es un middleware simple de ejemplo.
// Asumimos que el front manda el id o el rol en los headers (o usa JWT si se habilita)
exports.requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Requires Admin role' });
  }
};
