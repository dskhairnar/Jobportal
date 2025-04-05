const allowRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied. Role not permitted.' });
      }
      next();
    };
  };
  
  module.exports = allowRoles;
  