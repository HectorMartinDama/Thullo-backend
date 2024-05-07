import { Query } from '../../../../Shared/domain/Query';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';

export class SearchAllAttachmentsQuery implements Query {
  readonly id: BoardId;
  readonly userId: UserId;

  constructor(id: BoardId, userId: UserId) {
    this.id = id;
    this.userId = userId;
  }
}
