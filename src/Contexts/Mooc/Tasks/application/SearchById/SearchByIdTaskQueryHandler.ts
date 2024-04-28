import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Task } from '../../domain/Task';
import { SearchByIdTaskQuery } from './SearchByIdTaskQuery';
import { TasksByIdFinder } from './TasksByIdFinder';

export class SearchByIdTaskQueryHandler implements QueryHandler<SearchByIdTaskQuery, Task> {
  constructor(private finder: TasksByIdFinder) {}

  subscribedTo(): Query {
    return SearchByIdTaskQuery;
  }

  async handle(_query: SearchByIdTaskQuery): Promise<Task> {
    const task = await this.finder.run(_query.id, _query.userId);
    return task.toPrimitives();
  }
}
