import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardsResponse } from './BoardsResponse';

export class BoardsFinder {
  constructor(private boardsRepository: BoardRespository) {}

  async run(userId: UserId) {
    const boards = await this.boardsRepository.searchAll(userId);
    return new BoardsResponse(boards);
  }
}
