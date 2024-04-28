import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { DeleteBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/DeleteBoardCommand';

export class BoardDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { payload } = req.body;
      const deleteBoardCommand = new DeleteBoardCommand({ id, userId: payload.id.value });
      await this.commandBus.dispatch(deleteBoardCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
