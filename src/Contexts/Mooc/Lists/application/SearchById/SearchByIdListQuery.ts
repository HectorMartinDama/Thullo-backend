import { Query } from '../../../../Shared/domain/Query';

export class SearchByIdListQuery implements Query {
  readonly id: string;
  readonly userId: string;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
