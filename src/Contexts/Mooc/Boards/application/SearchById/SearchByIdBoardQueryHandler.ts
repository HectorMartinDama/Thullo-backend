import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Board } from '../../domain/Board';
import { BoardsByIdFinder } from './BoardsByIdFinder';
import { SearchByIdBoardQuery } from './SearchByIdBoardQuery';

export class SearchByIdBoardQueryHandler implements QueryHandler<SearchByIdBoardQuery, Board> {
  constructor(private finder: BoardsByIdFinder) {}

  subscribedTo(): Query {
    return SearchByIdBoardQuery;
  }

  async handle(_query: SearchByIdBoardQuery): Promise<Board> {
    const board = await this.finder.run(_query.userId, _query.boardId);
    return board.toPrimitives();
  }
}
