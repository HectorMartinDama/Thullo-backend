import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  boardId: string;
  userId: string;
};

export class DuplicateTaskCommand extends Command {
  id: string;
  boardId: string;
  userId: string;

  constructor({ id, boardId, userId }: Params) {
    super();
    this.id = id;
    this.boardId = boardId;
    this.userId = userId;
  }
}
