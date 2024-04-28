import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { AddAttachmentTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/AddAttachmentTaskCommand';

export class TaskPatchAddAttachmentController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { name, url, key, payload } = req.body;
      const addAttachmentTaskCommand = new AddAttachmentTaskCommand({ id, name, url, key, userId: payload.id.value });
      await this.commandBus.dispatch(addAttachmentTaskCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
