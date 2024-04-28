import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { ChangeBackgroundCommand } from '../../../../Contexts/Mooc/Boards/domain/ChangeBackgroundCommand';

export class BoardPatchChangeBackgroundController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { background, payload } = req.body;
      const changeBackgroundCommand = new ChangeBackgroundCommand({ id, userId: payload.id.value, background });
      await this.commandBus.dispatch(changeBackgroundCommand);
      res.sendStatus(httpStatus.OK);
    } catch (error) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
