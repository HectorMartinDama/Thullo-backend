import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskId } from '../../domain/types/TaskId';

export class TaskAdderDueDate {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; date: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id);
    if (task) {
      task.addDueDate(params.date);
      await this.repository.addDueDate(params.id, params.userId, params.date);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
