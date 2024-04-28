import { Board } from '../../domain/Board';

interface BoardResponse {
  id: string;
  title: string;
  background: string;
  visibility: string;
}

export class BoardsResponse {
  public readonly boards: Array<BoardResponse>;

  constructor(boards: Array<Board>) {
    this.boards = boards.map(board => board.toPrimitives());
  }
}
