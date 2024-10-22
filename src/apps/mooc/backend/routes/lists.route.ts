import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const register = (router: Router) => {
  const reqSchema = [body('id').exists().isString().isUUID(), body('title').exists().isString()];

  const reqSchemaUpdateOrder = [body('listsId').exists().isArray()];

  const reqSchemaRenameTitle = [body('title').exists().isString()];

  const listGetSearchByIdController = container.get('Apps.mooc.controllers.ListGetSearchByIdController');
  router.get('/lists/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    listGetSearchByIdController.run(req, res)
  );

  const listsPutController = container.get('Apps.mooc.controllers.ListPutController');
  router.put(
    '/lists/:boardId',
    reqSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => listsPutController.run(req, res)
  );

  const listPutUpdateOrder = container.get('Apps.mooc.controllers.ListPutUpdateOrderController');

  router.put(
    '/lists/updateOrder/:boardId',
    reqSchemaUpdateOrder,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => listPutUpdateOrder.run(req, res)
  );

  const listsDeleteController = container.get('Apps.mooc.controllers.ListDeleteController');
  router.delete('/lists/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    listsDeleteController.run(req, res)
  );

  const listPatchRenameTitleController = container.get('Apps.mooc.controllers.ListPatchRenameTitleController');
  router.patch(
    '/lists/rename/:id',
    reqSchemaRenameTitle,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => listPatchRenameTitleController.run(req, res)
  );
};
