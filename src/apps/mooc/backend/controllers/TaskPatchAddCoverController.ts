import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { AddCoverTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/AddCoverTaskCommand';

export class TaskPatchAddCoverController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { cover, payload } = req.body;
      const addCoverTaskCommand = new AddCoverTaskCommand({ id, cover, userId: payload.id.value });
      await this.commandBus.dispatch(addCoverTaskCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
