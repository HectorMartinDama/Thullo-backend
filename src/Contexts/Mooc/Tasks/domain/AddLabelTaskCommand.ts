import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  color: string;
  userId: string;
};

export class AddLabelTaskCommand extends Command {
  id: string;
  title: string;
  color: string;
  userId: string;

  constructor({ id, title, color, userId }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.color = color;
    this.userId = userId;
  }
}
