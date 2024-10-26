import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { AddDueDateTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/AddDueDateTaskCommand';

export class TaskPatchAddDueDateController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { date, payload } = req.body;
      const addDueDateTaskCommand = new AddDueDateTaskCommand({ id, date, userId: payload.id.value });
      await this.commandBus.dispatch(addDueDateTaskCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
