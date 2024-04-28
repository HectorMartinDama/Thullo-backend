import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  listId: string;
  boardId: string;
  userId: string;
};

export class CreateTaskCommand extends Command {
  id: string;
  title: string;
  listId: string;
  boardId: string;
  userId: string;

  constructor({ id, title, listId, boardId, userId }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.listId = listId;
    this.boardId = boardId;
    this.userId = userId;
  }
}
