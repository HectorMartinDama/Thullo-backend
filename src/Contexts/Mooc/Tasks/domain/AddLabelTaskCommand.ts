import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  userId: string;
};

export class AddLabelTaskCommand extends Command {
  id: string;
  title: string;
  userId: string;

  constructor({ id, title, userId }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.userId = userId;
  }
}
