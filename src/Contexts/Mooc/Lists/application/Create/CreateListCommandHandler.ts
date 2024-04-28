import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { CreateListCommand } from '../../domain/CreateListCommand';
import { ListId } from '../../domain/types/ListId';
import { ListTitle } from '../../domain/types/ListTitle';
import { ListCreator } from './ListCreator';

export class CreateListCommandHandler implements CommandHandler<CreateListCommand> {
  constructor(private listCreator: ListCreator) {}

  subscribedTo(): Command {
    return CreateListCommand;
  }

  async handle(command: CreateListCommand): Promise<void> {
    const id = new ListId(command.id);
    const title = new ListTitle(command.title);
    const boardId = new BoardId(command.boardId);
    const userId = new UserId(command.userId);
    await this.listCreator.run({ id, title, boardId, userId });
  }
}
