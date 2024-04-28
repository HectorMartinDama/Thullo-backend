import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddAttachmentTaskCommand } from '../../domain/AddAttachmentTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskAdderAttachment } from './TaskAdderAttachment';

export class AddedAttachmentCommandHandler implements CommandHandler<AddAttachmentTaskCommand> {
  constructor(private taskAdderAttachment: TaskAdderAttachment) {}

  subscribedTo(): Command {
    return AddAttachmentTaskCommand;
  }

  async handle(command: AddAttachmentTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const name = command.name;
    const url = command.url;
    const key = command.key;
    const userId = new UserId(command.userId);
    await this.taskAdderAttachment.run({ id, name, url, key, userId });
  }
}
