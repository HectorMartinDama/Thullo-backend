import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { ListId } from '../../../Lists/domain/types/ListId';
import { UserId } from '../../../Users/domain/types/UserId';
import { UpdatePositionTaskCommand } from '../../domain/UpdatePositionTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskUpdatorPosition } from './TaskUpdatorPosition';

export class UpdatePositionTaskCommandHandler implements CommandHandler<UpdatePositionTaskCommand> {
  constructor(private taskUpdatorPosition: TaskUpdatorPosition) {}

  subscribedTo(): Command {
    return UpdatePositionTaskCommand;
  }

  async handle(command: UpdatePositionTaskCommand): Promise<void> {
    const listId = new ListId(command.listId);
    const tasksId = command.tasksId.map(id => new TaskId(id));
    const userId = new UserId(command.userId);
    const id = new TaskId(command.id);
    await this.taskUpdatorPosition.run({ id, listId, tasksId, userId });
  }
}
