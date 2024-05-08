import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskId } from '../../domain/types/TaskId';

export class TaskAdderDescription {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { userId: UserId; id: TaskId; description: string }): Promise<void> {
    const task = await this.repository.search(params.id, params.userId);
    if (task) {
      task.addDescription(params.description);
      await this.repository.addDescription(params.userId, params.id, params.description);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
