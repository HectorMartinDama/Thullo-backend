import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
  visibility: string;
};

export class ChangeVisibilityCommand extends Command {
  id: string;
  userId: string;
  visibility: string;

  constructor({ id, userId, visibility }: Params) {
    super();
    this.id = id;
    this.userId = userId;
    this.visibility = visibility;
  }
}
