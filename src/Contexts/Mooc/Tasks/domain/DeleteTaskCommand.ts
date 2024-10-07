import { Command } from '../../../Shared/domain/Command';

type Params = {
  boardId: string;
  id: string;
  userId: string;
};

export class DeleteTaskCommand extends Command {
  boardId: string;
  id: string;
  userId: string;

  constructor({ boardId, id, userId }: Params) {
    super();
    this.boardId = boardId;
    this.id = id;
    this.userId = userId;
  }
}
