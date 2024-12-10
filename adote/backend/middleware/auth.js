// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware de Autenticação
module.exports = (requiredRole) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const parts = authHeader.split(' ');

      if (parts.length !== 2) {
        return res.status(401).json({ message: 'Erro no token' });
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token mal formatado' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = {
          id: decoded.id,
          role: decoded.role
        };

        if (requiredRole && decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Acesso negado' });
        }

        return next();
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
