import { Query } from '../../../../Shared/domain/Query';

export class FindUserQuery implements Query {
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
