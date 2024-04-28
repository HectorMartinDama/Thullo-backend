import httpStatus from 'http-status';
import { UserNotExist } from '../../../../Contexts/Mooc/Users/domain/UserNotExist';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { FindUserQuery } from '../../../../Contexts/Mooc/Users/application/Login/FindUserQuery';
import { JwtAdapter } from '../../../../Contexts/Shared/domain/jwt.adapter';
import { User } from '../../../../Contexts/Mooc/Users/domain/User';

export class UserLoginGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindUserQuery(req.params.email);
      const user = await this.queryBus.ask<User>(query);
      const token = await JwtAdapter.generateToken({ id: user.id });

      res.status(httpStatus.OK).send({ token });
    } catch (e) {
      if (e instanceof UserNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        console.log(e);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
