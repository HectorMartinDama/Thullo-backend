import httpStatus from 'http-status';
import { TaskNotExist } from '../../../../Contexts/Mooc/Tasks/application/SearchById/TaskNotExist';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { SearchByIdTaskQuery } from '../../../../Contexts/Mooc/Tasks/application/SearchById/SearchByIdTaskQuery';
import { Task } from '../../../../Contexts/Mooc/Tasks/domain/Task';

export class TaskGetSearchByIdController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      const query = new SearchByIdTaskQuery(req.params.id, payload.id.value);
      const task = await this.queryBus.ask<Task>(query);
      res.status(httpStatus.OK).json(task);
    } catch (e) {
      if (e instanceof TaskNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
}
