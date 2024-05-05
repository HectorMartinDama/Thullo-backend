import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import cors from 'cors';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('description').optional().isString(),
    body('background').exists().isString(),
    body('visibility').exists().isIn(['public', 'private', 'workSpace'])
  ];

  const reqAddMemberSchema = [body('email').exists().isString()];

  const reqChangeVisibilitySchema = [body('visibility').exists().isString()];

  const reqChangeBackgroundSchema = [body('background').exists().isString()];

  const boardsPutController = container.get('Apps.mooc.controllers.BoardPutController');
  router.put('/boards/:id', reqSchema, validateReqSchema, AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    boardsPutController.run(req, res)
  );

  const boardsGetSearchAllController = container.get('Apps.mooc.controllers.BoardGetSearchAllController');
  router.get(
    '/boards',
    cors({
      origin: 'https://thullo.pages.dev', // Opciones para permitir solo un origen específico
      methods: ['GET'], // Métodos permitidos
      allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos,
    }),
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => boardsGetSearchAllController.run(req, res)
  );

  const boardsGetSearchByIdController = container.get('Apps.mooc.controllers.BoardGetSearchByIdController');
  router.get('/boards/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    boardsGetSearchByIdController.run(req, res)
  );

  const boardPatchAddMemberController = container.get('Apps.mooc.controllers.BoardPatchAddMemberController');
  router.patch(
    '/boards/:id/addMember',
    reqAddMemberSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => boardPatchAddMemberController.run(req, res)
  );

  const boardPatchAddFavouriteController = container.get('Apps.mooc.controllers.BoardPatchAddFavouriteController');
  router.patch(
    '/boards/:id/addFavourite',
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => boardPatchAddFavouriteController.run(req, res)
  );

  const boardPatchChangeVisibilityController = container.get(
    'Apps.mooc.controllers.BoardPatchChangeVisibilityController'
  );
  router.patch(
    '/boards/:id/changeVisibility',
    reqChangeVisibilitySchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => boardPatchChangeVisibilityController.run(req, res)
  );

  const boardDeleteController = container.get('Apps.mooc.controllers.BoardDeleteController');
  router.delete('/boards/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    boardDeleteController.run(req, res)
  );

  const boardPatchChangeBackgroundController = container.get(
    'Apps.mooc.controllers.BoardPatchChangeBackgroundController'
  );
  router.patch(
    '/boards/:id/changeBackground',
    reqChangeBackgroundSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => boardPatchChangeBackgroundController.run(req, res)
  );
};
