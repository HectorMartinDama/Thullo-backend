import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskNotExist } from '../SearchById/TaskNotExist';

export class TaskRemoverLabel {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; labelId: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id, params.userId);
    if (task) {
      task.removeLabel(params.userId, params.labelId);
      await this.repository.removeLabel(params.id, params.labelId, params.userId);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) {
      throw new TaskNotExist();
    }
  }
}
