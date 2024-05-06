import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { RenameTitleListCommand } from '../../../../Contexts/Mooc/Lists/domain/RenameTitleListCommand';

export class ListPatchRenameTitleController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { title, payload } = req.body;
      const renameTitleListCommand = new RenameTitleListCommand({ id, userId: payload.id.value, title });
      await this.commandBus.dispatch(renameTitleListCommand);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
