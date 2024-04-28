import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';

export class TaskAdderAttachment {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; name: string; url: string; key: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id, params.userId);
    if (task) {
      task.addAttachment(params.name, params.url, params.key);
      await this.repository.addAttachment(params.id, params.userId, params.name, params.url, params.key);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
