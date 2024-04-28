import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { ChangeVisibilityCommand } from '../../../../Contexts/Mooc/Boards/domain/ChangeVisibilityCommand';

export class BoardPatchChangeVisibilityController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { visibility, payload } = req.body;
      const changeVisibilityCommand = new ChangeVisibilityCommand({ id, userId: payload.id.value, visibility });
      await this.commandBus.dispatch(changeVisibilityCommand);
      res.sendStatus(httpStatus.OK);
    } catch (e) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
