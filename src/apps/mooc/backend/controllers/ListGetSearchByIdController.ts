import httpStatus from 'http-status';
import { List } from '../../../../Contexts/Mooc/Lists/domain/List';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { SearchByIdListQuery } from '../../../../Contexts/Mooc/Lists/application/SearchById/SearchByIdListQuery';
import { ListNotExist } from '../../../../Contexts/Mooc/Lists/application/SearchById/ListNotExist';

export class ListGetSearchByIdController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      const query = new SearchByIdListQuery(req.params.id, payload.id.value);
      const list = await this.queryBus.ask<List>(query);
      res.status(httpStatus.OK).json(list);
    } catch (e) {
      if (e instanceof ListNotExist) res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
