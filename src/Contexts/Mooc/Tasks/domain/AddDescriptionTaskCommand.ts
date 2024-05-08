import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  description: string;
  userId: string;
};

export class AddDescriptionTaskCommand extends Command {
  id: string;
  description: string;
  userId: string;

  constructor({ id, description, userId }: Params) {
    super();
    this.id = id;
    this.description = description;
    this.userId = userId;
  }
}
