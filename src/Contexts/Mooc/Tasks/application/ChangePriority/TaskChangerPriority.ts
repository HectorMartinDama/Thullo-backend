import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskNotExist } from '../SearchById/TaskNotExist';

export class TaskChangerPriority {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; userId: UserId; priority: number }): Promise<void> {
    const task = await this.repository.search(params.id);
    if (task) {
      task.changePriority(params.userId, params.priority);
      await this.repository.changePriority(params.id, params.priority, params.userId);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) throw new TaskNotExist();
  }
}
