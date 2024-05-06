import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { RemoveFavouriteBoardCommand } from '../../domain/RemoveFavouriteBoardCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardRemoverFavourite } from './BoardRemoverFavourite';

export class RemoveFavouriteCommandHandler implements CommandHandler<RemoveFavouriteBoardCommand> {
  constructor(private boardRemoverFavourite: BoardRemoverFavourite) {}

  subscribedTo(): Command {
    return RemoveFavouriteBoardCommand;
  }

  async handle(command: RemoveFavouriteBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    await this.boardRemoverFavourite.run({ id, userId });
  }
}
