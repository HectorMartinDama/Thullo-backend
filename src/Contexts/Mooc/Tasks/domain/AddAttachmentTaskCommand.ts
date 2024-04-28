import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  name: string;
  url: string;
  key: string;
  userId: string;
};

export class AddAttachmentTaskCommand extends Command {
  id: string;
  url: string;
  name: string;
  key: string;
  userId: string;

  constructor({ id, name, url, key, userId }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.url = url;
    this.key = key;
    this.userId = userId;
  }
}
