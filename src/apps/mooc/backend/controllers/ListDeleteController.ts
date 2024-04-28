import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { DeleteListCommand } from '../../../../Contexts/Mooc/Lists/domain/DeleteListCommand';

export class ListDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { payload } = req.body;
      const deleteListCommand = new DeleteListCommand({ id, userId: payload.id.value });
      await this.commandBus.dispatch(deleteListCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      console.log('error al eliminar una lista', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
