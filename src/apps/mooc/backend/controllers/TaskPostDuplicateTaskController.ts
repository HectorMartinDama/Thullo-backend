import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';
import { DuplicateTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/DuplicateTaskCommand';

export class TaskPostDuplicateTaskController {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    try {
      const { id, boardId } = req.params;
      const { payload } = req.body;
      const duplicateTaskCommand = new DuplicateTaskCommand({ id, boardId, userId: payload.id.value });
      await this.commandBus.dispatch(duplicateTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      if (e instanceof BoardCannotModify) {
        res.status(httpStatus.FORBIDDEN).send();
      } else if (e instanceof TaskNotExist) res.status(httpStatus.NOT_FOUND).send();
    }
  }
}
