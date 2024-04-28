import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { BoardsFinder } from './BoardsFinder';
import { BoardsResponse } from './BoardsResponse';
import { SearchAllBoardsQuery } from './SearchAllBoardsQuery';

export class SearchAllBoardsQueryHandler implements QueryHandler<SearchAllBoardsQuery, BoardsResponse> {
  constructor(private boardsFinder: BoardsFinder) {}

  subscribedTo(): Query {
    return SearchAllBoardsQuery;
  }

  async handle(_query: SearchAllBoardsQuery): Promise<BoardsResponse> {
    return this.boardsFinder.run(_query.userId);
  }
}
