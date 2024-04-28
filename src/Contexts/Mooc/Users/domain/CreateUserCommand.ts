import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export class CreateUserCommand extends Command {
  id: string;
  name: string;
  email: string;
  image: string;

  constructor({ id, name, email, image }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }
}
