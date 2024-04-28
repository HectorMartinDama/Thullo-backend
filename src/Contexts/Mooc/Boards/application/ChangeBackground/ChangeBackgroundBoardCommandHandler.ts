import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { ChangeBackgroundCommand } from '../../domain/ChangeBackgroundCommand';
import { BoardBackground } from '../../domain/types/BoardBackground';
import { BoardId } from '../../domain/types/BoardId';
import { BoardChangerBackground } from './BoardChangerBackground';

export class ChangeBackgroundBoardCommandHandler implements CommandHandler<ChangeBackgroundCommand> {
  constructor(private boardChangerBackground: BoardChangerBackground) {}

  subscribedTo(): Command {
    return ChangeBackgroundCommand;
  }

  async handle(command: ChangeBackgroundCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    const background = new BoardBackground(command.background);
    await this.boardChangerBackground.run({ id, userId, background });
  }
}
