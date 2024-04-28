import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Users/domain/types/UserId';
import { AddMemberBoardCommand } from '../../domain/AddMemberBoardCommand';
import { BoardId } from '../../domain/types/BoardId';
import { BoardAdderMember } from './BoardAdderMember';

export class AddMemberBoardCommandHandler implements CommandHandler<AddMemberBoardCommand> {
  constructor(private boardAdderMember: BoardAdderMember) {}

  subscribedTo(): Command {
    return AddMemberBoardCommand;
  }

  async handle(command: AddMemberBoardCommand): Promise<void> {
    const id = new BoardId(command.id);
    const userId = new UserId(command.userId);
    const email = command.memberEmail;
    await this.boardAdderMember.run({ id, email, userId });
  }
}
