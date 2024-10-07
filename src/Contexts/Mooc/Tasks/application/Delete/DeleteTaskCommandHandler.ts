import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { DeleteTaskCommand } from '../../domain/DeleteTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskEliminator } from './TaskEliminator';

export class DeleteTaskCommandHandler implements CommandHandler<DeleteTaskCommand> {
  constructor(private taskEliminator: TaskEliminator) {}

  subscribedTo(): Command {
    return DeleteTaskCommand;
  }

  async handle(command: DeleteTaskCommand): Promise<void> {
    const boardId = new BoardId(command.boardId);
    const id = new TaskId(command.id);
    const userId = new UserId(command.userId);
    await this.taskEliminator.run({ boardId, id, userId });
  }
}
