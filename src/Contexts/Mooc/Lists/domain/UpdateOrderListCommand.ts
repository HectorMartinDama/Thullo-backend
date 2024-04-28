import { Command } from '../../../Shared/domain/Command';

type Params = {
  listsId: Array<string>;
  boardId: string;
  userId: string;
};

export class UpdateOrderListCommand extends Command {
  listsId: Array<string>;
  boardId: string;
  userId: string;

  constructor({ listsId, userId, boardId }: Params) {
    super();
    this.listsId = listsId;
    this.userId = userId;
    this.boardId = boardId;
  }
}
