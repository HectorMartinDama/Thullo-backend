import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { RenameTitleTaskCommand } from '../../domain/RenameTitleTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskRenamerTitle } from './TaskRenamerTitle';

export class RenameTitleTaskCommandHandler implements CommandHandler<RenameTitleTaskCommand> {
  constructor(private taskRenamerTitle: TaskRenamerTitle) {}

  subscribedTo(): Command {
    return RenameTitleTaskCommand;
  }

  async handle(command: RenameTitleTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const userId = new UserId(command.userId);
    const title = command.title;
    await this.taskRenamerTitle.run({ id, userId, title });
  }
}
