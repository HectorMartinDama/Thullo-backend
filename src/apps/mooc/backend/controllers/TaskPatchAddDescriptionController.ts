import httpStatus from 'http-status';
import { AddDescriptionTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/AddDescriptionTaskCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';

export class TaskPatchAddDescriptionController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { description, payload } = req.body;
      const addDescriptionTaskCommand = new AddDescriptionTaskCommand({ id, description, userId: payload.id.value });
      await this.commandBus.dispatch(addDescriptionTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
