import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  boardId: string;
  userId: string;
  priority: number;
};

export class ChangePriorityTaskCommand extends Command {
  id: string;
  boardId: string;
  userId: string;
  priority: number;

  constructor({ id, boardId, userId, priority }: Params) {
    super();
    this.id = id;
    this.boardId = boardId;
    this.userId = userId;
    this.priority = priority;
  }
}
