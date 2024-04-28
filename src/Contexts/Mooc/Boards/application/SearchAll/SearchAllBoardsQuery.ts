import { Query } from '../../../../Shared/domain/Query';
import { UserId } from '../../../Users/domain/types/UserId';

export class SearchAllBoardsQuery implements Query {
  readonly userId: UserId;

  constructor(userId: UserId) {
    this.userId = userId;
  }
}
