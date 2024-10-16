import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { ChangePriorityTaskCommand } from '../../domain/ChangePriorityTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskChangerPriority } from './TaskChangerPriority';

export class ChangePriorityTaskCommandHandler implements CommandHandler<ChangePriorityTaskCommand> {
  constructor(private taskChangerPriority: TaskChangerPriority) {}

  subscribedTo(): Command {
    return ChangePriorityTaskCommand;
  }

  async handle(command: ChangePriorityTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const boardId = new BoardId(command.boardId);
    const userId = new UserId(command.userId);
    const priority = command.priority;
    await this.taskChangerPriority.run({ id, boardId, userId, priority });
  }
}
