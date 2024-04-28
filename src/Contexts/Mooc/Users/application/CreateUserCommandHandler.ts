import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CreateUserCommand } from '../domain/CreateUserCommand';
import { UserEmail } from '../domain/types/UserEmail';
import { UserId } from '../domain/types/UserId';
import { UserImage } from '../domain/types/UserImage';
import { UserName } from '../domain/types/UserName';
import { UserCreator } from './UserCreator';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private userCreator: UserCreator) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand) {
    const id = new UserId(command.id);
    const name = new UserName(command.name);
    const email = new UserEmail(command.email);
    const image = new UserImage(command.image);
    const userId = await this.userCreator.run({ id, name, email, image });
    return userId;
  }
}
