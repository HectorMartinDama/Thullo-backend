import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString(),
    body('name').exists().isString(),
    body('email').exists().isString(),
    body('image').exists().isString()
  ];

  const userPostController = container.get('Apps.mooc.controllers.UserPostController');
  router.post('/users', reqSchema, validateReqSchema, (req: Request, res: Response) =>
    userPostController.run(req, res)
  );

  const userLoginGetController = container.get('Apps.mooc.controllers.UserLoginGetController');
  router.get('/users/login/:email', (req: Request, res: Response) => userLoginGetController.run(req, res));

  const userDeleteController = container.get('Apps.mooc.controllers.UserDeleteController');
  router.delete('/users/:email', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    userDeleteController.run(req, res)
  );
};
