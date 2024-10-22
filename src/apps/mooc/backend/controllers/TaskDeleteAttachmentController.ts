import httpStatus from 'http-status';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { DeleteAttachmentTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/DeleteAttachmentTaskCommand';

export class TaskDeleteAttachmentController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, key } = req.params;
      const { payload } = req.body;

      const deleteAttachmentTaskCommand = new DeleteAttachmentTaskCommand({ id, key, userId: payload.id.value });
      await this.commandBus.dispatch(deleteAttachmentTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      if (e instanceof TaskNotExist) res.sendStatus(httpStatus.NOT_FOUND).send({ message: e.message });
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
