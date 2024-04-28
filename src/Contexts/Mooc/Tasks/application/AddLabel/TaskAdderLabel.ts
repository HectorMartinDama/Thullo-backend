import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskId } from '../../domain/types/TaskId';

export class TaskAdderLabel {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; title: string; color: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id, params.userId);
    if (task) {
      task.addLabel(params.title, params.color);
      await this.repository.addLabel(params.id, params.userId, params.title, params.color);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
