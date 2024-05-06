import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { RenameBoardCommand } from '../../domain/RenameBoardCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardRenamerBoard } from './BoardRenamerBoard';

export class RenameBoardCommandHandler implements CommandHandler<RenameBoardCommand> {
  constructor(private boardRenamerBoard: BoardRenamerBoard) {}

  subscribedTo(): Command {
    return RenameBoardCommand;
  }

  async handle(command: RenameBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    const title = command.title;
    await this.boardRenamerBoard.run({ id, userId, title });
  }
}
