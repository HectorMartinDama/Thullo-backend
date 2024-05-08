import httpStatus from 'http-status';
import { RenameTitleTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/RenameTitleTaskCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';

export class TaskPatchRenameTitleController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { title, payload } = req.body;
      const renameTitleTaskCommand = new RenameTitleTaskCommand({ id, userId: payload.id.value, title });
      await this.commandBus.dispatch(renameTitleTaskCommand);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
