import { ListRepository } from '../../../Lists/domain/ListRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';
import { BoardNotExist } from './BoardNotExist';

export class BoardsByIdFinder {
  constructor(private boardsRepository: BoardRespository, private listsRepository: ListRepository) {}

  async run(userId: string, boardId: string) {
    const lists = await this.listsRepository.searchAllListsByBoard(new BoardId(boardId));
    let board;
    if (lists?.length === 0) {
      board = await this.boardsRepository.searchById(new UserId(userId), new BoardId(boardId));
    } else if (lists && lists.length >= 0) {
      console.log('paso por aqui board complete');
      board = await this.boardsRepository.searchByIdComplete(new UserId(userId), new BoardId(boardId));
      console.log('boardComplete', board);
    }
    if (!board) {
      throw new BoardNotExist();
    }
    return board;
  }
}
