import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2)
    return res.status(401).send({ error: 'Token malformatted' });

  const [ scheme, token ] = parts;

  if (!scheme.includes('Bearer'))
    return res.status(401).send({ error: 'No bearer' });

  jwt.verify(token, process.env.JWT_SALT, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: `${err.name} - ${err.message}` });

    req.userId = decoded.id;
    return next();
  })

}