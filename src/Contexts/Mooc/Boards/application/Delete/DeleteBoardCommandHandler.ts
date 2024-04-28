import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { DeleteBoardCommand } from '../../domain/DeleteBoardCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardEliminator } from './BoardEliminator';

export class DeleteBoardCommandHandler implements CommandHandler<DeleteBoardCommand> {
  constructor(private boardEliminator: BoardEliminator) {}

  subscribedTo(): Command {
    return DeleteBoardCommand;
  }

  async handle(command: DeleteBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    await this.boardEliminator.run({ id, userId });
  }
}
