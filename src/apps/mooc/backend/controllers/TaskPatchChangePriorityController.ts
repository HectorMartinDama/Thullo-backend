import { ChangePriorityTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/ChangePriorityTaskCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';

export class TaskPatchChangePriorityController {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { priority, payload } = req.body;
      const changePriorityTaskCommand = new ChangePriorityTaskCommand({ id, userId: payload.id.value, priority });
      await this.commandBus.dispatch(changePriorityTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      console.log('e', e);
      if (e instanceof TaskNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
