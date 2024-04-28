import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { DeleteUserCommand } from '../../../../Contexts/Mooc/Users/domain/DeleteUserCommand';

export class UserDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const { payload } = req.body;
      const deleteUserCommand = new DeleteUserCommand({ email, id: payload.id.value });
      await this.commandBus.dispatch(deleteUserCommand);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
