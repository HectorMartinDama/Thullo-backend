import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtAdapter } from '../../../../Contexts/Shared/domain/jwt.adapter';

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'token missing' });

    if (!authorization.toLowerCase().startsWith('bearer'))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'invalid bearer token' });

    const token = authorization.substring(7);

    try {
      const payload = await JwtAdapter.decodedToken(token);
      if (!payload) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'invalid token' });

      req.body.payload = payload;
      next();
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'token invalid or expired' });
    }
  };
}
