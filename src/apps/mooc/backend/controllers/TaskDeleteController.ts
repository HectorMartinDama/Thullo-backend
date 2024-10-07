import httpStatus from 'http-status';
import { DeleteTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/DeleteTaskCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';

export class TaskDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    try {
      const { id, boardId } = req.params;
      const { payload } = req.body;
      await this.commandBus.dispatch(new DeleteTaskCommand({ boardId, id, userId: payload.id.value }));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      console.log(e);
      if (e instanceof BoardCannotModify) {
        res.status(httpStatus.FORBIDDEN).send();
      } else if (e instanceof TaskNotExist) res.status(httpStatus.NOT_FOUND).send();
    }
  }
}
