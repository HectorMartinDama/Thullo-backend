import { Request, Response } from 'express';
import { Controller } from './Controller';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import httpStatus from 'http-status';
import { CreateTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/CreateTaskCommand';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';

export class TaskPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { boardId, listId } = req.params;
      const { id, title, payload } = req.body;
      const createTaskCommand = new CreateTaskCommand({ id, title, listId, boardId, userId: payload.id.value });
      await this.commandBus.dispatch(createTaskCommand);
      res.status(httpStatus.CREATED).send();
    } catch (e) {
      if (e instanceof BoardCannotModify) {
        res.status(httpStatus.UNAUTHORIZED).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
