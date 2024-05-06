import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
};

export class AddFavouriteBoardCommand extends Command {
  id: string;
  userId: string;

  constructor({ id, userId }: Params) {
    super();
    this.id = id;
    this.userId = userId;
  }
}
