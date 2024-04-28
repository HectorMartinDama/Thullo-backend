import { User } from '../../domain/User';

export class FindUserResponse {
  public readonly user: User;

  constructor(user: User) {
    this.user = user;
  }
}
