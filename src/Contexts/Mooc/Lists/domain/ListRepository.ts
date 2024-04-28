import { Nullable } from '../../../Shared/domain/Nullable';
import { BoardId } from '../../Boards/domain/types/BoardId';
import { UserId } from '../../Users/domain/types/UserId';
import { List } from './List';
import { ListId } from './types/ListId';

export interface ListRepository {
  search(id: ListId, userId: UserId): Promise<Nullable<List>>;
  searchAllListsByBoard(boardId: BoardId): Promise<Nullable<Array<List>>>;
  searchAllListsCompleteBoard(boardId: BoardId): Promise<Nullable<Array<List>>>;
  save(userId: UserId, boardId: BoardId, list: List): Promise<void>;
  delete(userId: UserId, id: ListId): Promise<void>;
  updateOrder(listsId: Array<ListId>, boardId: BoardId): Promise<void>;
}
