import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from '../../Users/domain/types/UserId';
import { Board } from './Board';
import { BoardBackground } from './types/BoardBackground';
import { BoardId } from './types/BoardId';
import { BoardVisibility } from './types/BoardVisibility';

export interface BoardRespository {
  save(userId: UserId, board: Board): Promise<void>;
  delete(userId: UserId, boardId: BoardId): Promise<void>;
  addMember(userId: UserId, id: BoardId, memberId: UserId): Promise<void>;
  addFavourite(userId: UserId, id: BoardId): Promise<void>;
  removeFavourite(userId: UserId, id: BoardId): Promise<void>;
  rename(userId: UserId, id: BoardId, title: string): Promise<void>;
  searchAll(userId: UserId): Promise<Array<Board>>;
  searchByIdComplete(userId: UserId, boardId: BoardId): Promise<Nullable<Board>>; // with lists and taskss
  searchById(userId: UserId, boardId: BoardId): Promise<Nullable<Board>>;
  checkCanModify(userId: UserId, boardId: BoardId): Promise<Boolean>;
  changeVisibility(userId: UserId, id: BoardId, visibility: BoardVisibility): Promise<void>;
  changeBackground(userId: UserId, id: BoardId, background: BoardBackground): Promise<void>;
}
