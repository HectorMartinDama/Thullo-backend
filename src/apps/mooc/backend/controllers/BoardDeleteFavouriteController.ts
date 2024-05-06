import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { BoardNotExist } from '../../../../Contexts/Mooc/Boards/application/SearchById/BoardNotExist';
import { RemoveFavouriteBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/RemoveFavouriteBoardCommand';
import httpStatus from 'http-status';

export class BoardDeleteFavouriteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { payload } = req.body;
      const removeFavouriteBoardCommand = new RemoveFavouriteBoardCommand({ id, userId: payload.id.value });
      await this.commandBus.dispatch(removeFavouriteBoardCommand);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      if (error instanceof BoardNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
}
