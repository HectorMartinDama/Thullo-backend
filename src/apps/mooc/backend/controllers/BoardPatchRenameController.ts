import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { RenameBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/RenameBoardCommand';

export class BoardPatchRenameController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { title, payload } = req.body;
      const renameBoardCommand = new RenameBoardCommand({ id, userId: payload.id.value, title });
      await this.commandBus.dispatch(renameBoardCommand);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      console.log(error);
    }
  }
}
