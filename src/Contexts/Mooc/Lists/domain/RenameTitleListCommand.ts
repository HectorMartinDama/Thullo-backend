import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
  title: string;
};

export class RenameTitleListCommand extends Command {
  id: string;
  userId: string;
  title: string;

  constructor({ id, userId, title }: Params) {
    super();
    this.id = id;
    this.userId = userId;
    this.title = title;
  }
}
