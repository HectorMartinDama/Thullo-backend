import httpStatus from 'http-status';
import { BoardId } from '../../../../Contexts/Mooc/Boards/domain/types/BoardId';
import { SearchAllAttachmentsQuery } from '../../../../Contexts/Mooc/Tasks/application/SearchAllAttachments/SearchAllAttachmentsQuery';
import { Attachament } from '../../../../Contexts/Mooc/Tasks/domain/types/TaskAttachment';
import { UserId } from '../../../../Contexts/Mooc/Users/domain/types/UserId';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';

export class TaskGetSearchAllAttachmentsController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response) {
    try {
      res.header('Access-Control-Allow-Origin', 'https://thullo.pages.dev');
      const { payload } = req.body;
      const query = new SearchAllAttachmentsQuery(new BoardId(req.params.id), new UserId(payload.id.value));
      const attachments = await this.queryBus.ask<Attachament[]>(query);
      res.status(httpStatus.OK).json(attachments);
    } catch (error) {
      console.log(error);
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
