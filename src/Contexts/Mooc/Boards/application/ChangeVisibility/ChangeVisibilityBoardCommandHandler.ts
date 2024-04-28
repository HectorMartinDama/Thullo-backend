import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { ChangeVisibilityCommand } from '../../domain/ChangeVisibilityCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardVisibility } from '../../domain/types/BoardVisibility';
import { BoardChangerVisibility } from './BoardChangerVisibility';

export class ChangeVisibilityBoardCommandHandler implements CommandHandler<ChangeVisibilityCommand> {
  constructor(private boardChangerVisibility: BoardChangerVisibility) {}

  subscribedTo(): Command {
    return ChangeVisibilityCommand;
  }

  async handle(command: ChangeVisibilityCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    const visibility = new BoardVisibility(command.visibility);
    await this.boardChangerVisibility.run({ id, userId, visibility });
  }
}
