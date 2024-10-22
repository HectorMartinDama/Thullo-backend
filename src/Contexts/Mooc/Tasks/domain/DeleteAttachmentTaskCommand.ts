import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  key: string;
  userId: string;
};

export class DeleteAttachmentTaskCommand extends Command {
  id: string;
  key: string;
  userId: string;

  constructor({ id, key, userId }: Params) {
    super();
    this.id = id;
    this.key = key;
    this.userId = userId;
  }
}
