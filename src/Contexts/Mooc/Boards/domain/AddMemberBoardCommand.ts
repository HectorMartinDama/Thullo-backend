import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  memberEmail: string;
  userId: string;
};

export class AddMemberBoardCommand extends Command {
  id: string;
  memberEmail: string;
  userId: string;

  constructor({ id, memberEmail, userId }: Params) {
    super();
    this.id = id;
    this.memberEmail = memberEmail;
    this.userId = userId;
  }
}
