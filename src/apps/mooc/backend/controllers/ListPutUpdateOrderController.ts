import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { UpdateOrderListCommand } from '../../../../Contexts/Mooc/Lists/domain/UpdateOrderListCommand';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';

export class ListPutUpdateOrderController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const boardId = req.params.boardId;
      const { listsId, payload } = req.body;
      const updateOrderListCommand = new UpdateOrderListCommand({ listsId, userId: payload.id.value, boardId });
      await this.commandBus.dispatch(updateOrderListCommand);
      res.status(httpStatus.CREATED).send();
    } catch (e) {
      if (e instanceof BoardCannotModify) {
        res.sendStatus(httpStatus.UNAUTHORIZED).send();
      } else {
        console.log('error al ordenar las listas', e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
