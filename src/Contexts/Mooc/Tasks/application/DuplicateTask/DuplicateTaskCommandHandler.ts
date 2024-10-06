import { Command } from '../../../../Shared/domain/Command';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { DuplicateTaskCommand } from '../../domain/DuplicateTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskDuplicator } from './TaskDuplicator';

export class DuplicateTaskCommandHandler {
  constructor(private taskDuplicator: TaskDuplicator) {}

  subscribedTo(): Command {
    return DuplicateTaskCommand;
  }

  async handle(command: DuplicateTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const boardId = new BoardId(command.boardId);
    const userId = new UserId(command.userId);
    await this.taskDuplicator.run({ id, boardId, userId });
  }
}
