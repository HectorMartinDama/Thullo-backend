import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddDescriptionTaskCommand } from '../../domain/AddDescriptionTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskAdderDescription } from './TaskAdderDescription';

export class AddedDescriptionTaskCommandHandler implements CommandHandler<AddDescriptionTaskCommand> {
  constructor(private taskAdderDescription: TaskAdderDescription) {}

  subscribedTo(): Command {
    return AddDescriptionTaskCommand;
  }

  async handle(command: AddDescriptionTaskCommand): Promise<void> {
    const userId = new UserId(command.userId);
    const id = new TaskId(command.id);
    const description = command.description;
    await this.taskAdderDescription.run({ userId, id, description });
  }
}
