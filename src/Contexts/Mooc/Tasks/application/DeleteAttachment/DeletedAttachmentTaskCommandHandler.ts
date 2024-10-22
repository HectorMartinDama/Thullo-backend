import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { DeleteAttachmentTaskCommand } from '../../domain/DeleteAttachmentTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskEliminatorAttachment } from './TaskEliminatorAttachment';

export class DeletedAttachmentTaskCommandHandler implements CommandHandler<DeleteAttachmentTaskCommand> {
  constructor(private taskEliminatorAttachment: TaskEliminatorAttachment) {}

  subscribedTo(): Command {
    return DeleteAttachmentTaskCommand;
  }

  async handle(command: DeleteAttachmentTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const key = command.key;
    const userId = new UserId(command.userId);
    await this.taskEliminatorAttachment.run({ id, key, userId });
  }
}
