import { Response, Request } from 'express';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import httpStatus from 'http-status';
import { CreateListCommand } from '../../../../Contexts/Mooc/Lists/domain/CreateListCommand';
import { BoardCannotModify } from '../../../../Contexts/Mooc/Boards/domain/BoardCannotModify';

type ListPutRequest = Request & {
  body: {
    id: string;
    title: string;
  };
};

export class ListPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: ListPutRequest, res: Response): Promise<void> {
    try {
      const boardId = req.params.boardId;
      const { id, title, payload } = req.body;

      console.log('boardId y userId', boardId, payload.id.value);

      const createListCommand = new CreateListCommand({ id, title, boardId, userId: payload.id.value });
      await this.commandBus.dispatch(createListCommand);
      res.status(httpStatus.CREATED).send();
    } catch (e) {
      if (e instanceof BoardCannotModify) {
        res.sendStatus(httpStatus.UNAUTHORIZED);
      } else {
        console.log(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
