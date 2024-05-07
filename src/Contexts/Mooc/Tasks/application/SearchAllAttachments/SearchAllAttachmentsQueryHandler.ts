import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Attachament } from '../../domain/types/TaskAttachment';
import { SearchAllAttachmentsFinder } from './SearchAllAttachmentsFinder';
import { SearchAllAttachmentsQuery } from './SearchAllAttachmentsQuery';

export class SearchAllAttachmentsQueryHandler implements QueryHandler<SearchAllAttachmentsQuery, Attachament[]> {
  constructor(private finder: SearchAllAttachmentsFinder) {}

  subscribedTo(): Query {
    return SearchAllAttachmentsQuery;
  }

  async handle(_query: SearchAllAttachmentsQuery) {
    return this.finder.run(_query.id, _query.userId);
  }
}
