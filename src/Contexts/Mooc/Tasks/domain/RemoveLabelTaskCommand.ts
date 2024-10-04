import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  labelId: string;
  userId: string;
};

export class RemoveLabelTaskCommand extends Command {
  id: string;
  labelId: string;
  userId: string;

  constructor({ id, labelId, userId }: Params) {
    super();
    this.id = id;
    this.labelId = labelId;
    this.userId = userId;
  }
}
