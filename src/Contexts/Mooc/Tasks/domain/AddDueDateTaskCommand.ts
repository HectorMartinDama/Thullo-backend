import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  date: string;
  userId: string;
};

export class AddDueDateTaskCommand extends Command {
  id: string;
  date: string;
  userId: string;

  constructor({ id, date, userId }: Params) {
    super();
    this.id = id;
    this.date = date;
    this.userId = userId;
  }
}
