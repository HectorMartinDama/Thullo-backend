import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { RemoveLabelTaskCommand } from '../../domain/RemoveLabelTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskRemoverLabel } from './TaskRemoverLabel';

export class RemovedLabelTaskCommandHandler implements CommandHandler<RemoveLabelTaskCommand> {
  constructor(private taskRemoverLabel: TaskRemoverLabel) {}

  subscribedTo(): Command {
    return RemoveLabelTaskCommand;
  }

  async handle(command: RemoveLabelTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const labelId = command.labelId;
    const userId = new UserId(command.userId);
    await this.taskRemoverLabel.run({ id, labelId, userId });
  }
}
