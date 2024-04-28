import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { User } from '../../domain/User';
import { FindUserQuery } from './FindUserQuery';
import { UserFinder } from './UserFinder';

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, User> {
  constructor(private finder: UserFinder) {}

  subscribedTo(): Query {
    return FindUserQuery;
  }

  async handle(_query: FindUserQuery): Promise<User> {
    const user = await this.finder.run(_query.email);
    return new User(user);
  }
}
