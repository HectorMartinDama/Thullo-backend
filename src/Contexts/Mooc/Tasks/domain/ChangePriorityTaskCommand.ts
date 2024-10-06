import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
  priority: number;
};

export class ChangePriorityTaskCommand extends Command {
  id: string;
  userId: string;
  priority: number;

  constructor({ id, userId, priority }: Params) {
    super();
    this.id = id;
    this.userId = userId;
    this.priority = priority;
  }
}
