import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { ListRepository } from '../../domain/ListRepository';
import { ListId } from '../../domain/types/ListId';

export class ListRenamerTitle {
  constructor(private repository: ListRepository, private eventBus: EventBus) {}

  async run(params: { id: ListId; userId: UserId; title: string }): Promise<void> {
    const list = await this.repository.search(params.id, params.userId);
    if (list) {
      list.renameTitle(params.userId, params.title);
      await this.repository.rename(params.userId, params.id, params.title);
      await this.eventBus.publish(list.pullDomainEvents());
    }
  }
}
