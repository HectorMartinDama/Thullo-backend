import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { UpdateOrderListCommand } from '../../domain/UpdateOrderListCommand';
import { ListId } from '../../domain/types/ListId';
import { ListUpdator } from './ListUpdator';

export class UpdateOrderListCommandHandler implements CommandHandler<UpdateOrderListCommand> {
  constructor(private listUpdator: ListUpdator) {}

  subscribedTo(): Command {
    return UpdateOrderListCommand;
  }

  async handle(command: UpdateOrderListCommand): Promise<void> {
    const listsId = command.listsId.map(id => new ListId(id));
    const userId = new UserId(command.userId);
    const boardId = new BoardId(command.boardId);
    await this.listUpdator.run({ listsId, userId, boardId });
  }
}
