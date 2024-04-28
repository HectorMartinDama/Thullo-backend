import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  listId: string;
  tasksId: Array<string>;
  userId: string;
};

export class UpdatePositionTaskCommand extends Command {
  id: string;
  listId: string;
  tasksId: Array<string>;
  userId: string;

  constructor({ id, listId, tasksId, userId }: Params) {
    super();
    this.id = id;
    this.listId = listId;
    this.tasksId = tasksId;
    this.userId = userId;
  }
}
