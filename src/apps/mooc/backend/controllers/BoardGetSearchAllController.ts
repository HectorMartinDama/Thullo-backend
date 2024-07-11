import { Request, Response } from 'express';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import httpStatus from 'http-status';
import { SearchAllBoardsQuery } from '../../../../Contexts/Mooc/Boards/application/SearchAll/SearchAllBoardsQuery';
import { BoardsResponse } from '../../../../Contexts/Mooc/Boards/application/SearchAll/BoardsResponse';
import { UserId } from '../../../../Contexts/Mooc/Users/domain/types/UserId';

export class BoardGetSearchAllController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response) {
    try {
      res.header('Access-Control-Allow-Origin', 'https://thullo.app');
      const { payload } = req.body; // get the bearer token
      const query = new SearchAllBoardsQuery(new UserId(payload.id.value));
      const boards = await this.queryBus.ask<BoardsResponse>(query);

      res.status(httpStatus.OK).json(boards.boards).end();
    } catch (e) {
      console.log(e);
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
