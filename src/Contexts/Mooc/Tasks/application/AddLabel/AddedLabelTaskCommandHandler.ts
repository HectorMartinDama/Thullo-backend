import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { AddLabelTaskCommand } from '../../domain/AddLabelTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskAdderLabel } from './TaskAdderLabel';
import { UserId } from '../../../Users/domain/types/UserId';

export class AddedLabelTaskCommandHandler implements CommandHandler<AddLabelTaskCommand> {
  constructor(private taskAdderLabel: TaskAdderLabel) {}

  subscribedTo(): Command {
    return AddLabelTaskCommand;
  }

  async handle(command: AddLabelTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const title = command.title;
    const color = command.color;
    const userId = new UserId(command.userId);
    await this.taskAdderLabel.run({ id, title, color, userId });
  }
}
