import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddFavouriteBoardCommand } from '../../domain/AddFavouriteBoardCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardAdderFavourite } from './BoardAdderFavourite';

export class AddFavouriteCommandHandler implements CommandHandler<AddFavouriteBoardCommand> {
  constructor(private boardAdderFavourite: BoardAdderFavourite) {}

  subscribedTo(): Command {
    return AddFavouriteBoardCommand;
  }

  async handle(command: AddFavouriteBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    await this.boardAdderFavourite.run({ id, userId });
  }
}
