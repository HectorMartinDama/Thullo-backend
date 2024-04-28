import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Response, Request } from 'express';
import { CreateBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/CreateBoardCommand';

type BoardPutRequest = Request & {
  body: {
    id: string;
    title: string;
    background: string;
    visibility: string;
    description: string;
  };
};

export class BoardPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: BoardPutRequest, res: Response): Promise<void> {
    try {
      const { id, title, background, visibility, description, payload } = req.body;
      const createBoardCommand = new CreateBoardCommand({
        id,
        title,
        background,
        visibility,
        description,
        userId: payload.id.value
      });
      await this.commandBus.dispatch(createBoardCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.log('error', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
