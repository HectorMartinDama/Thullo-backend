import { Command } from '../../../Shared/domain/Command';

type Params = {
  email: string;
  id: string;
};

export class DeleteUserCommand extends Command {
  email: string;
  id: string;

  constructor({ email, id }: Params) {
    super();
    this.email = email;
    this.id = id;
  }
}
