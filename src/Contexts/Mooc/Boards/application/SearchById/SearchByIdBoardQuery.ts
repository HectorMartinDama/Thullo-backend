import { Query } from '../../../../Shared/domain/Query';

export class SearchByIdBoardQuery implements Query {
  readonly userId: string;
  readonly boardId: string;

  constructor(userId: string, boardId: string) {
    this.userId = userId;
    this.boardId = boardId;
  }
}
