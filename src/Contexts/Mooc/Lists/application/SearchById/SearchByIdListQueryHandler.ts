import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { List } from '../../domain/List';
import { ListByIdFinder } from './ListByIdFinder';
import { SearchByIdListQuery } from './SearchByIdListQuery';

export class SearchByIdListQueryHandler implements QueryHandler<SearchByIdListQuery, List> {
  constructor(private finder: ListByIdFinder) {}

  subscribedTo(): Query {
    return SearchByIdListQuery;
  }

  async handle(_query: SearchByIdListQuery): Promise<List> {
    const list = await this.finder.run(_query.id, _query.userId);
    return list.toPrimitives();
  }
}
