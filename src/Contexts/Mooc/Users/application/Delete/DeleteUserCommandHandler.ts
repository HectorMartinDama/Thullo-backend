import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { DeleteUserCommand } from '../../domain/DeleteUserCommand';
import { UserId } from '../../domain/types/UserId';
import { UserEliminator } from './UserEliminator';

export class DeleteUserCommandHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private userEliminator: UserEliminator) {}

  subscribedTo(): Command {
    return DeleteUserCommand;
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    const email = command.email;
    const id = new UserId(command.id);
    await this.userEliminator.run({ email, id });
  }
}
