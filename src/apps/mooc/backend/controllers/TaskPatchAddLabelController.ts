import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { AddLabelTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/AddLabelTaskCommand';

export class TaskPatchAddLabelController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { title, payload } = req.body;
      const addLabelTaskCommand = new AddLabelTaskCommand({ id, title, userId: payload.id.value });
      await this.commandBus.dispatch(addLabelTaskCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
