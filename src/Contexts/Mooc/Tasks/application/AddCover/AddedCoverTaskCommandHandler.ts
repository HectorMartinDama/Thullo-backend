import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddCoverTaskCommand } from '../../domain/AddCoverTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskAdderCover } from './TaskAdderCover';

export class AddedCoverTaskCommandHandler implements CommandHandler<AddCoverTaskCommand> {
  constructor(private taskAdderCover: TaskAdderCover) {}

  subscribedTo(): Command {
    return AddCoverTaskCommand;
  }

  async handle(command: AddCoverTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const cover = command.cover;
    const userId = new UserId(command.userId);
    await this.taskAdderCover.run({ id, cover, userId });
  }
}
