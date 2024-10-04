import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { RemoveLabelTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/RemoveLabelTaskCommand';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';

export class TaskDeleteLabelController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { labelId, id } = req.params;
      const { payload } = req.body;
      const deleteLabelTaskCommand = new RemoveLabelTaskCommand({
        id,
        labelId,
        userId: payload.id.value
      });
      await this.commandBus.dispatch(deleteLabelTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      if (e instanceof TaskNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
