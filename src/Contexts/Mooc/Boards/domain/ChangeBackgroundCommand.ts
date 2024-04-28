import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
  background: string;
};

export class ChangeBackgroundCommand extends Command {
  id: string;
  userId: string;
  background: string;

  constructor({ id, userId, background }: Params) {
    super();
    this.id = id;
    this.userId = userId;
    this.background = background;
  }
}
