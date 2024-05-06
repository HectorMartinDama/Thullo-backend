import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { RenameTitleListCommand } from '../../domain/RenameTitleListCommand';
import { ListRenamerTitle } from './ListRenamerTitle';
import { ListId } from '../../domain/types/ListId';
import { Command } from '../../../../Shared/domain/Command';

export class RenameTitleListCommandHandler implements CommandHandler<RenameTitleListCommand> {
  constructor(private listRenamerTitle: ListRenamerTitle) {}

  subscribedTo(): Command {
    return RenameTitleListCommand;
  }

  async handle(command: RenameTitleListCommand): Promise<void> {
    const id = new ListId(command.id);
    const userId = new UserId(command.userId);
    const title = command.title;
    await this.listRenamerTitle.run({ id, userId, title });
  }
}
