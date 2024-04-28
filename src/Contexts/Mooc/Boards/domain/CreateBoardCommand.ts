import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  background: string;
  visibility: string;
  description?: string;
  userId: string;
};

export class CreateBoardCommand extends Command {
  id: string;
  title: string;
  background: string;
  visibility: string;
  description?: string;
  userId: string;

  constructor({ id, title, background, visibility, description, userId }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.background = background;
    this.visibility = visibility;
    this.description = description;
    this.userId = userId;
  }
}
