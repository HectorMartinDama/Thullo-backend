import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  boardId: string;
  userId: string;
};

export class CreateListCommand extends Command {
  id: string;
  title: string;
  boardId: string;
  userId: string;

  constructor({ id, title, boardId, userId }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.boardId = boardId;
    this.userId = userId;
  }
}
