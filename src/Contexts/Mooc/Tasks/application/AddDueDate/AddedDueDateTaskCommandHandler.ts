import { Command } from '../../../../Shared/domain/Command';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddDueDateTaskCommand } from '../../domain/AddDueDateTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskAdderDueDate } from './TaskAdderDueDate';

export class AddedDueDateTaskCommandHandler {
  constructor(private taskAdderDueDate: TaskAdderDueDate) {}

  subscribedTo(): Command {
    return AddDueDateTaskCommand;
  }

  async handle(command: AddDueDateTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const date = command.date;
    const userId = new UserId(command.userId);
    await this.taskAdderDueDate.run({ id, date, userId });
  }
}
