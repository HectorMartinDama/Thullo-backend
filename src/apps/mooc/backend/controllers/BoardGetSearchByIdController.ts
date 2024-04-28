import { Request, Response } from 'express';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import httpStatus from 'http-status';
import { SearchByIdBoardQuery } from '../../../../Contexts/Mooc/Boards/application/SearchById/SearchByIdBoardQuery';
import { BoardNotExist } from '../../../../Contexts/Mooc/Boards/application/SearchById/BoardNotExist';
import { Board } from '../../../../Contexts/Mooc/Boards/domain/Board';

export class BoardGetSearchByIdController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      const query = new SearchByIdBoardQuery(payload.id.value, req.params.id);
      const board = await this.queryBus.ask<Board>(query);
      res.status(httpStatus.OK).json(board);
    } catch (e) {
      if (e instanceof BoardNotExist) {
        console.log(e);
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
}
