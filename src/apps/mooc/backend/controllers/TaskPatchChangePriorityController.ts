import { ChangePriorityTaskCommand } from '../../../../Contexts/Mooc/Tasks/domain/ChangePriorityTaskCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';

export class TaskPatchChangePriorityController {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, boardId } = req.params;
      const { priority, payload } = req.body;
      const changePriorityTaskCommand = new ChangePriorityTaskCommand({
        id,
        boardId,
        userId: payload.id.value,
        priority
      });
      await this.commandBus.dispatch(changePriorityTaskCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      if (e instanceof BoardCannotModify) {
        res.sendStatus(httpStatus.UNAUTHORIZED);
      } else if (e instanceof TaskNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
