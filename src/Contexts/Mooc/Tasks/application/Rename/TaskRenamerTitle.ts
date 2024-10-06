import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskRepository } from '../../domain/TaskRepository';

export class TaskRenamerTitle {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; userId: UserId; title: string }): Promise<void> {
    const task = await this.repository.search(params.id);
    if (task) {
      task.renameTitle(params.userId, params.title);
      await this.repository.rename(params.userId, params.id, params.title);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
