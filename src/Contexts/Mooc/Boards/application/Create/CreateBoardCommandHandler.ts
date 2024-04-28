import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { CreateBoardCommand } from '../../domain/CreateBoardCommand';
import { BoardBackground } from '../../domain/types/BoardBackground';
import { BoardId } from '../../domain/types/BoardId';
import { BoardTitle } from '../../domain/types/BoardTitle';
import { BoardVisibility } from '../../domain/types/BoardVisibility';
import { BoardCreator } from './BoardCreator';

export class CreateBoardCommandHandler implements CommandHandler<CreateBoardCommand> {
  constructor(private boardCreator: BoardCreator) {}

  subscribedTo(): Command {
    return CreateBoardCommand;
  }

  async handle(command: CreateBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const title = new BoardTitle(command.title);
    const background = new BoardBackground(command.background);
    const visibility = new BoardVisibility(command.visibility);
    const description = command.description;
    const userId = new UserId(command.userId);

    await this.boardCreator.run({ id, title, background, visibility, description, userId });
  }
}
