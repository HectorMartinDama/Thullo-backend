import { Request, Response } from 'express';
import { Controller } from './Controller';
import httpStatus from 'http-status';
import { CreateUserCommand } from '../../../../Contexts/Mooc/Users/domain/CreateUserCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';

type UserPostRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

export class UserPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: UserPostRequest, res: Response) {
    try {
      const { id, name, email, image } = req.body;
      const createUserCommand = new CreateUserCommand({ id, name, email, image });
      await this.commandBus.dispatch(createUserCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send();
    }
  }
}
