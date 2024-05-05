import { AddFavouriteBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/AddFavouriteBoardCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import e, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BoardNotExist } from '../../../../Contexts/Mooc/Boards/application/SearchById/BoardNotExist';

export class BoardPatchAddFavouriteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { payload } = req.body;
      const addFavouriteBoardCommand = new AddFavouriteBoardCommand({ id, userId: payload.id.value });
      await this.commandBus.dispatch(addFavouriteBoardCommand);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      if (e instanceof BoardNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
}
