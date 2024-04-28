import httpStatus from 'http-status';
import { UserNotExist } from '../../../../Contexts/Mooc/Users/domain/UserNotExist';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { AddMemberBoardCommand } from '../../../../Contexts/Mooc/Boards/domain/AddMemberBoardCommand';

export class BoardPatchAddMemberController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { email, payload } = req.body;
      const addMemberBoardCommand = new AddMemberBoardCommand({ id, memberEmail: email, userId: payload.id.value });
      await this.commandBus.dispatch(addMemberBoardCommand);
      res.sendStatus(httpStatus.CREATED);
    } catch (e) {
      if (e instanceof UserNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
}
