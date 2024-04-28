import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { UpdatePositionTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/UpdatePositionTaskCommand';

export class TaskPutUpdatePositionController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, listId } = req.params;
      const { tasksId, payload } = req.body;
      const updatePositionTaskCommand = new UpdatePositionTaskCommand({
        id,
        listId,
        tasksId,
        userId: payload.id.value
      });
      await this.commandBus.dispatch(updatePositionTaskCommand);
      res.status(httpStatus.NO_CONTENT);
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
