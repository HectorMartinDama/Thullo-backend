import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { DeleteListCommand } from '../../domain/DeleteListCommand';
import { ListId } from '../../domain/types/ListId';
import { ListEliminator } from './ListEliminator';

export class DeleteListCommandHandler implements CommandHandler<DeleteListCommand> {
  constructor(private listEliminator: ListEliminator) {}

  subscribedTo(): Command {
    return DeleteListCommand;
  }

  async handle(command: DeleteListCommand): Promise<void> {
    const id = new ListId(command.id);
    const userId = new UserId(command.userId);
    await this.listEliminator.run({ id, userId });
  }
}
