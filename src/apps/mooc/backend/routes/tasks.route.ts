import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isUUID(),
    body('title').exists().isString(),
    body('description').optional().isString(),
    body('background').optional().isString()
  ];

  const reqAddDescriptionSchema = [body('description').exists().isString()];

  const reqAddCoverSchema = [body('cover').exists().isString()];

  const reqAddLabelSchema = [body('title').exists().isString(), body('color').exists().isString()];

  const reqAddAttachmentSchema = [body('url').exists().isString(), body('name').exists().isString()];

  const reqUpdatePositionSchema = [body('tasksId').exists().isArray()];

  const tasksPutController = container.get('Apps.mooc.controllers.TasksPutController');
  router.put(
    '/tasks/:boardId/:listId',
    reqSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => tasksPutController.run(req, res)
  );

  const tasksGetSearchByIdController = container.get('Apps.mooc.controllers.TaskGetSearchByIdController');
  router.get('/tasks/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    tasksGetSearchByIdController.run(req, res)
  );

  const tasksPatchAddCoverController = container.get('Apps.mooc.controllers.TaskPatchAddCoverController');
  router.patch(
    '/tasks/addCover/:id',
    reqAddCoverSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => tasksPatchAddCoverController.run(req, res)
  );

  const tasksPatchAddLabelController = container.get('Apps.mooc.controllers.TaskPatchAddLabelController');
  router.patch(
    '/tasks/addLabel/:id',
    reqAddLabelSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => tasksPatchAddLabelController.run(req, res)
  );

  const taskPatchAddAttachmentController = container.get('Apps.mooc.controllers.TaskPatchAddAttachmentController');
  router.patch(
    '/tasks/addAttachment/:id',
    reqAddAttachmentSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => taskPatchAddAttachmentController.run(req, res)
  );

  const tasksPutUpdatePositionController = container.get('Apps.mooc.controllers.TaskPutUpdatePositionController');
  router.put(
    '/tasks/:id/updatePosition/:listId',
    reqUpdatePositionSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => tasksPutUpdatePositionController.run(req, res)
  );

  const taskGetSearchAllAttachmentsController = container.get(
    'Apps.mooc.controllers.TaskGetSearchAllAttachmentsController'
  );
  router.get('/tasks/allAttachments/:id', AuthMiddleware.validateJWT, (req: Request, res: Response) =>
    taskGetSearchAllAttachmentsController.run(req, res)
  );

  const taskPatchAddDescriptionController = container.get('Apps.mooc.controllers.TaskPatchAddDescriptionController');
  router.patch(
    '/tasks/addDescription/:id',
    reqAddDescriptionSchema,
    validateReqSchema,
    AuthMiddleware.validateJWT,
    (req: Request, res: Response) => taskPatchAddDescriptionController.run(req, res)
  );
};
