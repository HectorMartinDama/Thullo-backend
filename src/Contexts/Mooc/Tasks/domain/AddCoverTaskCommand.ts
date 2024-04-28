import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  cover: string;
  userId: string;
};

export class AddCoverTaskCommand extends Command {
  id: string;
  cover: string;
  userId: string;

  constructor({ id, cover, userId }: Params) {
    super();
    this.id = id;
    this.cover = cover;
    this.userId = userId;
  }
}
