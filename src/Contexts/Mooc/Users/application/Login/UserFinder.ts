import { UserRepository } from '../../domain/UserRepository';
import { UserNotExist } from '../../domain/UserNotExist';
import { User } from '../../domain/User';

export class UserFinder {
  constructor(private respository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.respository.search(email);
    if (!user) {
      throw new UserNotExist();
    }
    return new User(user);
  }
}
